"""
AI Studio - Prompt & Style Code Generator
Crafted for Abdel Salam (AM Marketing)
Assembles 8K Midjourney / ChatGPT Prompts from 100 Layered Image Codes.
"""

import sys
import json
from pathlib import Path

# Fix Windows console UTF-8 encoding
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

DATA_FILE = Path(__file__).resolve().parent / "layered_image_codes.json"

def safe_input(prompt_text, default=""):
    try:
        val = input(prompt_text).strip()
        return val if val else default
    except (EOFError, KeyboardInterrupt):
        return default

def load_codes():
    if not DATA_FILE.exists():
        print(f"[!] Error: {DATA_FILE} not found.")
        return {}
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def build_prompt(subject, style_code_entry, aspect_ratio="9:16"):
    tag = style_code_entry["tag"]
    code = style_code_entry["code"]
    
    prompt = (
        f"Masterpiece 8k portrait of {subject}, {tag}, "
        f"volumetric moody lighting, soft rim light, fine-art editorial photography, "
        f"8k resolution, octane render, photorealistic, cinematic composition "
        f"--ar {aspect_ratio} --v 6.0 --q 2 --style raw"
    )
    return prompt

def main():
    catalog = load_codes()
    categories = catalog.get("categories", {})
    
    all_codes = []
    for cat_key, cat_data in categories.items():
        for item in cat_data.get("codes", []):
            all_codes.append((cat_data["name_ar"], item))
            
    print("=" * 65)
    print("  [+] 100 Layered Image Codes & Style Generator")
    print("  AM Marketing AI Studio - Abdel Salam")
    print("=" * 65)
    print(f"Total Master Codes Loaded: {len(all_codes)}")
    print("=" * 65)
    
    search_term = safe_input("\n[?] Search code or press Enter for first 15: ", "")
    
    matches = []
    if search_term:
        for cat_name, item in all_codes:
            if search_term.lower() in item["code"].lower() or search_term in item["name_ar"] or search_term.lower() in item["tag"].lower():
                matches.append((cat_name, item))
    else:
        matches = all_codes[:15]
        
    if not matches:
        print("[!] No results found. Try words like: double, neon, smoke, floral, city")
        return
        
    print("\n[ Available Codes ]:")
    for idx, (cat_name, item) in enumerate(matches, 1):
        print(f"  {idx:2d}. {item['code']:<30} | {item['name_ar']}")
        
    choice = safe_input("\nEnter code number (default 1): ", "1")
    selected_idx = int(choice) - 1 if choice.isdigit() and 1 <= int(choice) <= len(matches) else 0
    cat_name, selected_item = matches[selected_idx]
    
    subject = safe_input("\nEnter subject (e.g. Arab male visionary marketer): ", "Arab male visionary marketer in tailored suit")
    aspect = safe_input("Choose aspect ratio [1 = 9:16 vertical reel, 2 = 16:9 widescreen] (default 1): ", "1")
    ar = "16:9" if aspect == "2" else "9:16"
    
    final_prompt = build_prompt(subject, selected_item, ar)
    
    print("\n" + "=" * 65)
    print(f"[*] Selected Code: {selected_item['code']} ({selected_item['name_ar']})")
    print("=" * 65)
    print("\n[ Ready-to-copy Prompt for Midjourney / ChatGPT / DALL-E ]:\n")
    print(final_prompt)
    print("\n" + "=" * 65)
    
    history_file = Path(__file__).resolve().parent / "generated_prompts.txt"
    try:
        with open(history_file, "a", encoding="utf-8") as hf:
            hf.write(f"\n[{selected_item['code']}] - {subject}\n{final_prompt}\n")
        print(f"[*] Prompt automatically saved to: {history_file.name}")
    except Exception:
        pass

if __name__ == "__main__":
    main()
