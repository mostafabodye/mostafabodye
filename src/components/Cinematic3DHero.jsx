import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { enterpriseProjects } from '../data/enterpriseProjects';
import { getAssetUrl } from '../utils/assets';
import { MessageSquare, ExternalLink, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Curated high-fidelity project cards for the 3 laptop columns (matching reference site screenshot)
const LAPTOP_SHOWCASE_ITEMS = {
  col1: [
    {
      title: 'Fawry Business',
      category: 'Fintech & Systems',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/fawry.webp',
      fallbackColor: '#1e293b'
    },
    {
      title: 'Yaddly Agency',
      category: 'Digital Marketing',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/yaddly.webp',
      fallbackColor: '#0f172a'
    },
    {
      title: 'Torjoman Services',
      category: 'Corporate Translation',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/torjoman.webp',
      fallbackColor: '#172554'
    },
    {
      title: 'Valeria FX',
      category: 'Trading Platform',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/val.webp',
      fallbackColor: '#1e1b4b'
    },
    {
      title: 'Think Group',
      category: 'Creative Studio',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/think-1.png',
      fallbackColor: '#111827'
    },
    {
      title: 'Stand By Logistics',
      category: 'Supply Chain',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/stand.webp',
      fallbackColor: '#09090b'
    }
  ],
  col2: [
    {
      title: 'Tala Luxury',
      category: 'Fashion & Retail',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/tala.webp',
      fallbackColor: '#27272a'
    },
    {
      title: 'Nordstrom Style',
      category: 'Global Ecommerce',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/nord.webp',
      fallbackColor: '#18181b'
    },
    {
      title: 'Moonmains EGY',
      category: 'Apparel Store',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/moon.webp',
      fallbackColor: '#2e1065'
    },
    {
      title: 'Mazajkoon Boutique',
      category: 'Lifestyle Store',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/mazaj.webp',
      fallbackColor: '#1e293b'
    },
    {
      title: 'Safety Shield',
      category: 'Industrial Systems',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/safety.webp',
      fallbackColor: '#0f172a'
    },
    {
      title: 'F&G Creative Studio',
      category: 'Media Production',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/fg.webp',
      fallbackColor: '#1e1b4b'
    }
  ],
  col3: [
    {
      title: 'Brain Academy',
      category: 'Online Learning',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/brain.webp',
      fallbackColor: '#042f2e'
    },
    {
      title: 'Classical Petra Tours',
      category: 'Tourism & Travel',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/classical.webp',
      fallbackColor: '#1c1917'
    },
    {
      title: 'Digitology Media',
      category: 'Digital World',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/digi.webp',
      fallbackColor: '#1e293b'
    },
    {
      title: 'Ulum Al-Azhar Academy',
      category: 'Islamic Courses',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/azhar.webp',
      fallbackColor: '#14532d'
    },
    {
      title: 'Avens Health',
      category: 'Medical Center',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/avens.webp',
      fallbackColor: '#0e7490'
    },
    {
      title: 'Al-Raqi Group',
      category: 'Corporate Enterprise',
      img: 'https://abdallah-mohamed.dev/wp-content/uploads/2025/12/alraqi.webp',
      fallbackColor: '#1f2937'
    }
  ]
};

export default function Cinematic3DHero({ onExploreProjects }) {
  const containerRef = useRef(null);
  const glContainerRef = useRef(null);
  const cssContainerRef = useRef(null);
  const laptopContentRef = useRef(null);
  const spacerRef = useRef(null);

  // Duplicate items for continuous looping animation
  const column1Items = useMemo(() => [...LAPTOP_SHOWCASE_ITEMS.col1, ...LAPTOP_SHOWCASE_ITEMS.col1], []);
  const column2Items = useMemo(() => [...LAPTOP_SHOWCASE_ITEMS.col2, ...LAPTOP_SHOWCASE_ITEMS.col2], []);
  const column3Items = useMemo(() => [...LAPTOP_SHOWCASE_ITEMS.col3, ...LAPTOP_SHOWCASE_ITEMS.col3], []);

  useEffect(() => {
    const glContainer = glContainerRef.current;
    const cssContainer = cssContainerRef.current;
    const laptopContent = laptopContentRef.current;
    const spacer = spacerRef.current;

    if (!glContainer || !cssContainer || !laptopContent || !spacer) return;

    // --- CONFIG & CONSTANTS ---
    const COLORS = {
      bg: 0x0a0a0a,
      gold: 0xffbd59,
      blue: 0x00f3ff,
      metal: 0x111111
    };

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLORS.bg, 0.02);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2, 10);

    // --- RENDERERS ---
    const webGLRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    webGLRenderer.shadowMap.enabled = true;
    glContainer.innerHTML = '';
    glContainer.appendChild(webGLRenderer.domElement);

    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssContainer.innerHTML = '';
    cssContainer.appendChild(cssRenderer.domElement);

    // --- LIGHTS ---
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(0xffbd59, 1.8);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(COLORS.blue, 2.5, 18);
    blueLight.position.set(2, 2, -5);
    scene.add(blueLight);

    // --- OBJECT 1: ROTATING INPUT GOLD CUBE + WIREFRAME ---
    const inputGroup = new THREE.Group();
    const cubeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
      new THREE.MeshStandardMaterial({ color: COLORS.gold, roughness: 0.25, metalness: 0.85 })
    );
    cubeMesh.castShadow = true;
    inputGroup.add(cubeMesh);

    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.3, 1.3, 1.3)),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
    );
    inputGroup.add(wire);
    scene.add(inputGroup);

    // --- OBJECT 2: FACTORY CONVEYOR BELT, PIPES & LASER ---
    const factoryGroup = new THREE.Group();
    factoryGroup.position.set(0, -2, -12);

    const belt = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 50),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 })
    );
    belt.rotation.x = -Math.PI / 2;
    belt.receiveShadow = true;
    factoryGroup.add(belt);

    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7 });
    const pipe1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 40), pipeMat);
    pipe1.rotation.x = Math.PI / 2;
    pipe1.position.set(-3, 4, 0);
    factoryGroup.add(pipe1);

    const smokeParticles = [];
    const smokeMat = new THREE.MeshBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.35 });
    for (let i = 0; i < 30; i++) {
      const sm = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.6), smokeMat);
      sm.position.set(Math.random() * 6 - 3, Math.random() * 5, Math.random() * 20 - 10);
      sm.userData = { speed: 0.02 + Math.random() * 0.03 };
      smokeParticles.push(sm);
      factoryGroup.add(sm);
    }

    const arch = new THREE.Group();
    const archLeg = new THREE.Mesh(new THREE.BoxGeometry(0.5, 4, 0.5), pipeMat);
    const al = archLeg.clone();
    al.position.set(-2.2, 2, 0);
    const ar = archLeg.clone();
    ar.position.set(2.2, 2, 0);
    const at = new THREE.Mesh(new THREE.BoxGeometry(5, 0.5, 0.8), pipeMat);
    at.position.set(0, 4, 0);
    arch.add(al, ar, at);

    const laser = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 4),
      new THREE.MeshBasicMaterial({ color: COLORS.blue, transparent: true, opacity: 0.12, side: THREE.DoubleSide })
    );
    laser.position.y = 2;
    arch.add(laser);
    factoryGroup.add(arch);
    scene.add(factoryGroup);

    // --- OBJECT 3: 3D LAPTOP WITH CSS3D SCREEN ---
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(2, -1, -28);

    const lapBase = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.2, 4),
      new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.6, roughness: 0.4 })
    );
    laptopGroup.add(lapBase);

    const screenPiv = new THREE.Group();
    screenPiv.position.set(0, 0.1, -2);

    const sBack = new THREE.Mesh(
      new THREE.BoxGeometry(6, 4, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7, roughness: 0.3 })
    );
    sBack.position.set(0, 2, 0);
    screenPiv.add(sBack);

    // Attach CSS3DObject
    laptopContent.style.display = 'flex';
    const cssObj = new CSS3DObject(laptopContent);
    cssObj.scale.set(0.0056, 0.0056, 0.0056);
    cssObj.position.set(0, 2, 0.06);
    screenPiv.add(cssObj);

    // Start with screen closed flat
    screenPiv.rotation.x = -Math.PI / 2;
    laptopGroup.add(screenPiv);
    scene.add(laptopGroup);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let animId;

    function animate() {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smoke floating
      smokeParticles.forEach((p) => {
        p.position.y += p.userData.speed;
        p.lookAt(camera.position);
        if (p.position.y > 6) p.position.y = 0;
      });

      // Laser pulsating
      laser.material.opacity = 0.06 + Math.sin(t * 8) * 0.06;

      // Rotating gold input box
      inputGroup.rotation.x = t * 0.5;
      inputGroup.rotation.y = t * 0.3;

      // Render both engines
      webGLRenderer.render(scene, camera);
      cssRenderer.render(scene, camera);
    }
    animate();

    // --- GSAP SCROLLTRIGGER PROGRESSION ---
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 901px)',
        isMobile: '(max-width: 900px)'
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        if (isMobile) {
          camera.position.z = 15;
        } else {
          camera.position.z = 10;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: spacer,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
          }
        });

        // Step 1: Input -> Factory
        tl.to(camera.position, {
          z: isMobile ? -15 : -10,
          y: 3,
          duration: 4
        })
          .to(inputGroup.position, { z: -10, y: -0.5, duration: 4 }, '<')
          .to('#text-stage-1', { opacity: 0, y: -50, duration: 1 }, '<')
          .to('#text-stage-2', { opacity: 1, y: 0, duration: 1 }, '-=2');

        // Step 2: Factory Process (Cube through Laser)
        tl.to(inputGroup.position, { z: -20, duration: 4 })
          .to(inputGroup.scale, { x: 0, y: 0, z: 0, duration: 1 }, '-=1');

        // Step 3: Reveal Laptop & Unfold Screen
        tl.to(camera.position, {
          z: -24,
          y: 0.5,
          x: 0,
          duration: 4
        })
          .to('#text-stage-2', { opacity: 0, y: -50, duration: 1 }, '<')
          .to(screenPiv.rotation, { x: -0.2, duration: 2 }, '-=2');

        // Step 4: Laptop Slides Right + ME Section Glides In
        if (isDesktop) {
          tl.to(laptopGroup.position, { x: 5, duration: 3 })
            .to(camera.position, { x: 0, z: -24, duration: 3 }, '<')
            .to('#me-section', { opacity: 1, x: 0, pointerEvents: 'auto', duration: 2, ease: 'power2.out' }, '-=2');
        } else {
          tl.to(laptopGroup.position, { y: 2, z: -35, opacity: 1, duration: 3 })
            .to(laptopGroup.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 3 }, '<')
            .to(camera.position, { x: 0, z: -24, duration: 3 }, '<')
            .to('#me-section', { opacity: 1, x: 0, pointerEvents: 'auto', duration: 2, ease: 'power2.out' }, '-=2');
        }
      }
    );

    // Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      webGLRenderer.setSize(w, h);
      cssRenderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      webGLRenderer.dispose();
    };
  }, []);

  const handleScrollToProjects = () => {
    if (onExploreProjects) {
      onExploreProjects();
    } else {
      const el = document.getElementById('category-gallery');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ── FIXED 3D VIEWPORT CONTAINER ── */}
      <div className="wfs-fixed-background">
        {/* Base 3D WebGL Canvas */}
        <div id="canvas-container" ref={glContainerRef} />

        {/* CSS3D Container for Screen */}
        <div id="css-container" ref={cssContainerRef} />

        {/* UI Overlay for Stage Texts */}
        <div className="wfs-ui-layer">
          <div className="overlay-text" id="text-stage-1" style={{ opacity: 1 }}>
            <div className="wfs-h2">Input Stage</div>
            <div className="wfs-h1">Your Idea &amp; Company</div>
          </div>
          <div className="overlay-text" id="text-stage-2">
            <div className="wfs-h2">Processing</div>
            <div className="wfs-h1">Development</div>
          </div>
        </div>

        {/* ── FINAL "ME" SECTION OVERLAY (LEFT SIDE PROFILE) ── */}
        <div id="me-section">
          <div className="code-bg" />

          <div className="me-content">
            <div className="me-img">
              <img
                src={getAssetUrl('/assets/images/abdel-salam-portrait.jpg')}
                alt="Abdel Salam"
                loading="eager"
              />
            </div>
            <div className="me-text">
              <h3>Full Stack Developer WordPress &amp; Shopify &amp; Salla</h3>
              <h1>I Build Websites with the best <br />UI/UX Experience</h1>
              <p>Turning complex problems into elegant, profitable interactive Websites.</p>
            </div>
          </div>

          <div className="skills-grid">
            {[
              'WordPress',
              'WooCommerce',
              'Shopify',
              'HTML',
              'CSS',
              'Bootstrap',
              'JS',
              'JQuery',
              'React',
              'Three.js',
              'PHP',
              'Custom plugins',
              'Custom Themes'
            ].map((skill) => (
              <div key={skill} className="skill-box">
                {skill}
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <button
              onClick={handleScrollToProjects}
              className="btn btn-primary cursor-pointer flex items-center gap-2"
            >
              <span>MY PROJECTS</span>
              <ArrowDown size={14} />
            </button>
            <a
              href="https://wa.me/201098174992"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary flex items-center gap-2"
            >
              <MessageSquare size={14} />
              <span>CONTACT ME</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── HIDDEN TEMPLATE CONTENT FOR 3D LAPTOP SCREEN ── */}
      <div style={{ position: 'absolute', top: -9999, left: -9999, pointerEvents: 'none' }}>
        <div id="laptop-content" ref={laptopContentRef}>
          {/* Column 1: Scrolling Down */}
          <div className="website-col scroll-down col-1">
            {column1Items.map((item, idx) => (
              <div
                key={`c1-${idx}`}
                className="web-item relative group overflow-hidden rounded-md border border-white/10"
                style={{ backgroundColor: item.fallbackColor }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to stylized high-tech card if external image fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2 text-white">
                  <div className="text-[10px] font-mono text-amber-400 font-bold">{item.category}</div>
                  <div className="text-xs font-black truncate">{item.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Scrolling Up */}
          <div className="website-col scroll-up col-2">
            {column2Items.map((item, idx) => (
              <div
                key={`c2-${idx}`}
                className="web-item relative group overflow-hidden rounded-md border border-white/10"
                style={{ backgroundColor: item.fallbackColor }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2 text-white">
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">{item.category}</div>
                  <div className="text-xs font-black truncate">{item.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: Scrolling Down */}
          <div className="website-col scroll-down col-3">
            {column3Items.map((item, idx) => (
              <div
                key={`c3-${idx}`}
                className="web-item relative group overflow-hidden rounded-md border border-white/10"
                style={{ backgroundColor: item.fallbackColor }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2 text-white">
                  <div className="text-[10px] font-mono text-purple-400 font-bold">{item.category}</div>
                  <div className="text-xs font-black truncate">{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCROLL SPACER (GSAP SCROLLTRIGGER ENGINE TRACK) ── */}
      <div ref={spacerRef} className="wfs-scroll-spacer" />
    </div>
  );
}
