"""
AI Studio - Automated Reel & Montage Engine
Designed for Abdel Salam (AM Marketing Portfolio)
Utilizes FFmpeg to produce vertical 9:16 cinematic reels from AI images and videos.
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path

# Fix Windows console encoding for Arabic & emojis
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
OUTPUT_DIR = PROJECT_ROOT / "public" / "assets" / "videos"

def run_ffmpeg(cmd):
    """Executes FFmpeg command and reports status."""
    print("\n[>> FFmpeg Running...]")
    print(" ".join(cmd))
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding="utf-8", errors="replace")
    if result.returncode != 0:
        print("[!] FFmpeg Error:\n", result.stderr[-1000:] if result.stderr else "Unknown error")
        return False
    print("[*] Success! File created successfully.")
    return True

def convert_to_vertical_reel(input_file, output_file=None):
    """
    Converts any landscape or square video into a 1080x1920 9:16 vertical reel.
    Uses split-screen cinematic blurred background to eliminate black borders.
    """
    input_path = Path(input_file)
    if not input_path.exists():
        print(f"[!] File not found: {input_file}")
        return False
    
    if not output_file:
        output_file = OUTPUT_DIR / f"reel_{input_path.stem}.mp4"
    else:
        output_file = Path(output_file)
    
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    # Complex filter:
    # 1. Background: scale to 1080x1920 (crop to fill), boxblur 25:5, dim by 15%
    # 2. Foreground: scale to width 1080 (preserving aspect ratio)
    # 3. Overlay foreground centered on blurred background
    filter_complex = (
        "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        "boxblur=25:5,eq=brightness=-0.15:saturation=1.2[bg];"
        "[0:v]scale=1080:-2:force_original_aspect_ratio=decrease[fg];"
        "[bg][fg]overlay=(W-w)/2:(H-h)/2[v]"
    )
    
    cmd = [
        "ffmpeg", "-y",
        "-i", str(input_path),
        "-filter_complex", filter_complex,
        "-map", "[v]",
        "-map", "0:a?",
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "18",
        "-c:a", "aac",
        "-b:a", "192k",
        "-pix_fmt", "yuv420p",
        str(output_file)
    ]
    
    return run_ffmpeg(cmd)

def image_to_cinematic_motion(image_file, output_file=None, duration=6, zoom_type="in"):
    """
    Takes an AI 4K/2K generated still image and turns it into a 9:16 vertical
    cinematic video clip with Ken Burns camera zoom and atmospheric grading.
    """
    image_path = Path(image_file)
    if not image_path.exists():
        print(f"[!] Image not found: {image_file}")
        return False
    
    if not output_file:
        output_file = OUTPUT_DIR / f"motion_{image_path.stem}.mp4"
    else:
        output_file = Path(output_file)
        
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    total_frames = int(duration * 30)
    
    if zoom_type == "in":
        zoom_expr = "min(pzoom+0.0015,1.3)"
    else:
        zoom_expr = "max(1.3-0.0015*on,1.0)"
        
    # Scale & zoompan to 1080x1920
    filter_complex = (
        f"scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        f"zoompan=z='{zoom_expr}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={total_frames}:s=1080x1920:fps=30,"
        f"eq=contrast=1.08:saturation=1.15"
    )
    
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", str(image_path),
        "-vf", filter_complex,
        "-t", str(duration),
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "19",
        "-pix_fmt", "yuv420p",
        str(output_file)
    ]
    
    return run_ffmpeg(cmd)

def create_complete_reel(video_or_image, audio_file, title_text="Abdel Salam | AM Marketing", output_file=None):
    """
    Combines visual asset (image or video) with ElevenLabs voiceover / audio,
    adds glowing watermark branding, and exports final reel.
    """
    input_path = Path(video_or_image)
    audio_path = Path(audio_file)
    
    if not input_path.exists() or not audio_path.exists():
        print("[!] Input video/image or audio file does not exist.")
        return False
        
    if not output_file:
        output_file = OUTPUT_DIR / f"final_reel_{input_path.stem}.mp4"
    else:
        output_file = Path(output_file)
        
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    is_image = input_path.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp"]
    
    if is_image:
        cmd = [
            "ffmpeg", "-y",
            "-loop", "1",
            "-i", str(input_path),
            "-i", str(audio_path),
            "-filter_complex",
            (
                "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
                "eq=contrast=1.06:saturation=1.1,"
                f"drawtext=text='{title_text}':fontcolor=white:fontsize=36:x=(w-text_w)/2:y=h-140:"
                "box=1:boxcolor=black@0.6:boxborderw=15[v]"
            ),
            "-map", "[v]",
            "-map", "1:a",
            "-c:v", "libx264",
            "-tune", "stillimage",
            "-preset", "fast",
            "-crf", "18",
            "-c:a", "aac",
            "-b:a", "192k",
            "-shortest",
            "-pix_fmt", "yuv420p",
            str(output_file)
        ]
    else:
        cmd = [
            "ffmpeg", "-y",
            "-i", str(input_path),
            "-i", str(audio_path),
            "-filter_complex",
            (
                "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
                f"drawtext=text='{title_text}':fontcolor=white:fontsize=36:x=(w-text_w)/2:y=h-140:"
                "box=1:boxcolor=black@0.6:boxborderw=15[v];"
                "[1:a]volume=1.0[a]"
            ),
            "-map", "[v]",
            "-map", "[a]",
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "18",
            "-c:a", "aac",
            "-b:a", "192k",
            "-shortest",
            "-pix_fmt", "yuv420p",
            str(output_file)
        ]
        
    return run_ffmpeg(cmd)

def main():
    parser = argparse.ArgumentParser(description="AI Studio Automated Reel Engine")
    parser.add_argument("--mode", choices=["convert", "motion", "combine"], default="convert",
                        help="convert: landscape to 9:16 reel, motion: image to cinematic zoom, combine: visual + audio")
    parser.add_argument("--input", required=False, help="Path to input video or image")
    parser.add_argument("--audio", required=False, help="Path to input audio file")
    parser.add_argument("--output", required=False, help="Path to output file")
    parser.add_argument("--duration", type=int, default=6, help="Duration for motion reel in seconds")
    parser.add_argument("--title", default="Abdel Salam | AM Marketing", help="Watermark title text")
    
    args = parser.parse_args()
    
    if not args.input:
        print("="*60)
        print(" AI Studio - Automated Reel Engine (Abdel Salam)")
        print("="*60)
        print("1. Convert Video to 9:16 Reel (Cinematic Blur Padding)")
        print("2. Turn AI Image into Cinematic Motion Video (Ken Burns Zoom)")
        print("3. Combine Image/Video with Audio & Title Watermark")
        print("="*60)
        choice = input("Enter choice (1/2/3): ").strip()
        
        inp = input("Enter path to input file: ").strip().strip('"').strip("'")
        if choice == "1":
            convert_to_vertical_reel(inp)
        elif choice == "2":
            dur = input("Enter duration in seconds (default 6): ").strip()
            dur = int(dur) if dur.isdigit() else 6
            image_to_cinematic_motion(inp, duration=dur)
        elif choice == "3":
            aud = input("Enter path to audio file (mp3/wav): ").strip().strip('"').strip("'")
            tit = input("Enter subtitle/title text (default 'Abdel Salam | AM Marketing'): ").strip()
            tit = tit if tit else "Abdel Salam | AM Marketing"
            create_complete_reel(inp, aud, title_text=tit)
        return
        
    if args.mode == "convert":
        convert_to_vertical_reel(args.input, args.output)
    elif args.mode == "motion":
        image_to_cinematic_motion(args.input, args.output, duration=args.duration)
    elif args.mode == "combine":
        if not args.audio:
            print("[Error] --audio is required for combine mode.")
            return
        create_complete_reel(args.input, args.audio, title_text=args.title, output_file=args.output)

if __name__ == "__main__":
    main()
