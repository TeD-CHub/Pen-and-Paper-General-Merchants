/**
 * Pen and Paper Provisions — Interactive Storefront Script with 3D Effects
 */

document.addEventListener("DOMContentLoaded", () => {
  const productCards = [...document.querySelectorAll(".product-card")];
  const filterButtons = [...document.querySelectorAll(".filter-chip")];
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  // Category Filtering
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Update active states
      filterButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

      // Filter product cards with smooth transition
      productCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.hidden = !matches;
      });
    });
  });

  // Mobile Navigation Toggle
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      const nextState = !isOpen;

      menuToggle.setAttribute("aria-expanded", String(nextState));
      menuToggle.setAttribute("aria-label", nextState ? "Close navigation" : "Open navigation");
      navigation.classList.toggle("is-open", nextState);
    });

    // Close mobile nav when clicking a link
    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        navigation.classList.remove("is-open");
      });
    });

    // Close on Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("is-open")) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        navigation.classList.remove("is-open");
        menuToggle.focus();
      }
    });
  }

  // Initialize Interactive 3D Canvas
  initHero3D();
});

/**
 * Interactive 3D Hero Scene (Three.js WebGL)
 */
function initHero3D() {
  const container = document.getElementById("three-canvas-container");
  const fallbackPhoto = document.getElementById("hero-fallback-photo");
  if (!container || typeof THREE === "undefined") return;

  try {
    // Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(4, 5, 4);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const purplePoint1 = new THREE.PointLight(0xa78bfa, 2, 10);
    purplePoint1.position.set(-3, 2, 2);
    scene.add(purplePoint1);

    const purplePoint2 = new THREE.PointLight(0x7c3aed, 1.8, 10);
    purplePoint2.position.set(3, -2, 2);
    scene.add(purplePoint2);

    // 1. Procedural 3D Book Group
    const bookGroup = new THREE.Group();
    bookGroup.position.set(-0.15, 0.05, 0.1);
    bookGroup.rotation.set(0.2, -0.35, 0.1);

    // Cover
    const coverGeo = new THREE.BoxGeometry(1.65, 2.25, 0.32);
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0x581c87,
      roughness: 0.25,
      metalness: 0.15,
    });
    const cover = new THREE.Mesh(coverGeo, coverMat);
    cover.castShadow = true;
    bookGroup.add(cover);

    // Pages
    const pagesGeo = new THREE.BoxGeometry(1.52, 2.15, 0.25);
    const pagesMat = new THREE.MeshStandardMaterial({
      color: 0xfaf5ff,
      roughness: 0.8,
    });
    const pages = new THREE.Mesh(pagesGeo, pagesMat);
    pages.position.x = 0.06;
    bookGroup.add(pages);

    // Spine
    const spineGeo = new THREE.CylinderGeometry(0.16, 0.16, 2.25, 16);
    const spineMat = new THREE.MeshStandardMaterial({
      color: 0x3b0764,
      roughness: 0.3,
      metalness: 0.3,
    });
    const spine = new THREE.Mesh(spineGeo, spineMat);
    spine.position.x = -0.8;
    bookGroup.add(spine);

    // Gold spine bands
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0xddd6fe,
      metalness: 0.8,
      roughness: 0.2,
    });
    const band1 = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.165, 0.06, 16), bandMat);
    band1.position.set(-0.81, 0.6, 0);
    bookGroup.add(band1);

    const band2 = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.165, 0.06, 16), bandMat);
    band2.position.set(-0.81, -0.6, 0);
    bookGroup.add(band2);

    scene.add(bookGroup);

    // 2. Secondary Floating Book
    const bookGroup2 = new THREE.Group();
    bookGroup2.position.set(1.4, -0.6, -0.6);
    bookGroup2.rotation.set(-0.25, 0.5, -0.15);
    bookGroup2.scale.set(0.9, 0.9, 0.9);

    const cover2 = new THREE.Mesh(
      coverGeo,
      new THREE.MeshStandardMaterial({ color: 0x6d28d9, roughness: 0.3 })
    );
    bookGroup2.add(cover2);
    const pages2 = new THREE.Mesh(pagesGeo, pagesMat);
    pages2.position.x = 0.06;
    bookGroup2.add(pages2);
    scene.add(bookGroup2);

    // 3. Floating 3D Fountain Pen
    const penGroup = new THREE.Group();
    penGroup.position.set(-1.6, 0.5, 0.4);
    penGroup.rotation.set(0.4, 0.2, -0.65);

    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 1.1, 20),
      new THREE.MeshStandardMaterial({ color: 0x6d28d9, metalness: 0.4, roughness: 0.2 })
    );
    barrel.position.y = 0.55;
    penGroup.add(barrel);

    const ring = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.085, 0.08, 20),
      bandMat
    );
    ring.position.y = 0.04;
    penGroup.add(ring);

    const grip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.065, 0.55, 20),
      new THREE.MeshStandardMaterial({ color: 0x2e1065, roughness: 0.3 })
    );
    grip.position.y = -0.28;
    penGroup.add(grip);

    const nib = new THREE.Mesh(
      new THREE.ConeGeometry(0.065, 0.25, 16),
      new THREE.MeshStandardMaterial({ color: 0xc4b5fd, metalness: 0.9, roughness: 0.1 })
    );
    nib.position.y = -0.65;
    penGroup.add(nib);

    scene.add(penGroup);

    // 4. Floating Glowing Spheres
    const sphereMat1 = new THREE.MeshStandardMaterial({
      color: 0xc4b5fd,
      roughness: 0.15,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const orb1 = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), sphereMat1);
    orb1.position.set(1.8, 1.1, -0.5);
    scene.add(orb1);

    const sphereMat2 = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      roughness: 0.2,
      metalness: 0.3,
      transparent: true,
      opacity: 0.8,
    });
    const orb2 = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24), sphereMat2);
    orb2.position.set(-1.8, -1.1, -0.2);
    scene.add(orb2);

    // 5. Ambient Sparkle Particles
    const particleCount = 40;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 7;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xddd6fe,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Tracking for Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Floating gentle bobbing
      bookGroup.position.y = 0.05 + Math.sin(elapsedTime * 1.5) * 0.08;
      bookGroup.rotation.y = -0.35 + targetX * 0.3;
      bookGroup.rotation.x = 0.2 - targetY * 0.25;

      bookGroup2.position.y = -0.6 + Math.cos(elapsedTime * 1.2) * 0.09;
      bookGroup2.rotation.y = 0.5 + targetX * 0.2;

      penGroup.position.y = 0.5 + Math.sin(elapsedTime * 1.8 + 1) * 0.1;
      penGroup.rotation.z = -0.65 + Math.sin(elapsedTime * 1.5) * 0.15;
      penGroup.rotation.y = 0.2 + targetX * 0.4;

      orb1.position.y = 1.1 + Math.sin(elapsedTime * 2) * 0.08;
      orb2.position.y = -1.1 + Math.cos(elapsedTime * 2.2) * 0.07;

      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = elapsedTime * 0.02;

      renderer.render(scene, camera);
    }

    animate();

    // Resize Handler
    function handleResize() {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }

    window.addEventListener("resize", handleResize);

    // Reveal 3D canvas and hide fallback image
    container.classList.add("is-active");
    if (fallbackPhoto) {
      fallbackPhoto.classList.add("has-three-js");
    }
  } catch (err) {
    console.warn("WebGL not supported or failed to initialize Three.js scene:", err);
  }
}
