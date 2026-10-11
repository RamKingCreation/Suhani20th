let currentStep = 1;
const totalSteps = 8;
let userName = "Suhani"; 
let introAlreadyStarted = false;
let photoUploaded = false;
let messageStarted = false;
let scrollOpened = false;
let scrollTypingStarted = false; 
let fanIsOn = false;
let diwaliLightsInterval;
let windInterval;
let fireworksInterval;
let bgGradientInterval; 
let watermarkInterval; 

// ================= APKE HISAB SE PASSWORD SET KAREIN =================
const correctPassword = "suhani1210"; 

function verifyPassword() {
  const inputField = document.getElementById("secretPasswordInput");
  const passwordSection = document.getElementById("passwordSection");
  const cakeMainContent = document.getElementById("cakeMainContent");

  if (!inputField) return;

  const enteredValue = inputField.value.trim();

  if (enteredValue === correctPassword) {
    showHint("🎉Sahi Password! Surprise unlocked!");
    if (passwordSection) passwordSection.style.display = "none";
    if (cakeMainContent) {
      cakeMainContent.style.display = "block";
      cakeMainContent.style.animation = "smoothShow 0.7s ease forwards";
    }
  } else {
    showHint("❌ Galat Password! Dobara koshish karein.");
    inputField.value = "";
    inputField.style.borderColor = "#ff4d6d";
    setTimeout(() => {
      inputField.style.borderColor = "rgba(255, 255, 255, 0.3)";
    }, 1000);
  }
}
// =====================================================================

const diwaliColors = ['#ff0055', '#00ff66', '#00ffff', '#ffff00', '#ff00ff', '#ff6600', '#9900ff', '#fffa00'];
const bulbsArray = [];

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  startFloatingHearts();
  setupPhotoUpload(); 
  setupHeart(); 
  buildDiwaliWireLights(); 
  formatRoyalScrollParagraphs(); 
  setupPolaroidInteractions(); 
  startAmbientBgShift();        
  startPremiumWatermarkEngine(); 
  
  const intro = document.getElementById("introScreen");
  if (intro) {
    intro.addEventListener("click", startExperience, { once: true });
    intro.addEventListener("touchstart", startExperience, { once: true });
  }
});

function startAmbientBgShift() {
  const gradients = [
    "linear-gradient(135deg, #0f0c1b, #201335, #0f0c1b)",
    "linear-gradient(135deg, #0b132b, #1c2541, #0b132b)",
    "linear-gradient(135deg, #1a0f1a, #331433, #1a0f1a)",
    "linear-gradient(135deg, #0d1b2a, #1b263b, #0d1b2a)"
  ];
  let gIndex = 0;
  document.body.style.transition = "background 4s ease-in-out";
  
  bgGradientInterval = setInterval(() => {
    gIndex = (gIndex + 1) % gradients.length;
    document.body.style.background = gradients[gIndex];
  }, 5000);
}

function startPremiumWatermarkEngine() {
  const customGreetings = [
    `${userName}🎂`,
    "Happy Birthday ✨",
    "Stay Blessed🌸 Dear",
    "Surprise Dear👑",
    `${userName} ji🎉`
  ];

  watermarkInterval = setInterval(() => {
    if (document.hidden) return;

    const watermark = document.createElement("div");
    watermark.innerText = customGreetings[Math.floor(Math.random() * customGreetings.length)];
    
    watermark.style.position = "fixed";
    watermark.style.left = (10 + Math.random() * 70) + "%";
    watermark.style.top = (15 + Math.random() * 65) + "%";
    watermark.style.transform = `translate(-50%, -50%) scale(0.6) rotate(${Math.random() * 30 - 15}deg)`;
    watermark.style.opacity = "0";
    watermark.style.color = "#ffffff";
    watermark.style.fontFamily = "'Dancing Script', cursive, sans-serif";
    watermark.style.fontSize = (28 + Math.random() * 24) + "px";
    watermark.style.letterSpacing = "2px";
    watermark.style.pointerEvents = "none";
    watermark.style.zIndex = "1"; 
    watermark.style.userSelect = "none";
    watermark.style.whiteSpace = "nowrap";
    watermark.style.transition = "opacity 2s ease, transform 6s cubic-bezier(0.1, 0.8, 0.2, 1)";
    
    document.body.appendChild(watermark);

    requestAnimationFrame(() => {
      watermark.style.opacity = Math.random() * 0.05 + 0.04; 
      watermark.style.transform = watermark.style.transform.replace("scale(0.6)", "scale(1.15)");
    });

    setTimeout(() => {
      watermark.style.opacity = "0";
      setTimeout(() => watermark.remove(), 2100);
    }, 3800);
  }, 2500);
}

function startExperience() {
  if (introAlreadyStarted) return;
  introAlreadyStarted = true;

  const audio = document.getElementById("bgMusic");
  const hint = document.querySelector(".audio-trigger-hint");

  if (hint) {
    hint.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    hint.style.opacity = "0";
    hint.style.transform = "translateY(-10px)";
  }

  if (audio) {
    audio.volume = 0.4;
    audio.play().catch(() => {
      console.log("Audio play blocked, continuing intro");
    });
  }
  startCountdown();
}

function startCountdown() {
  const numEl = document.getElementById("countdownNumber");
  const introText = document.getElementById("introText");
  const introSubText = document.getElementById("introSubText");
  const introName = document.getElementById("introName");
  const introHeart = document.getElementById("introHeart");

  if (!numEl) return;

  const sequence = ["3", "2", "1"];
  let index = 0;

  function showNumber() {
    numEl.style.display = "block";
    numEl.innerText = sequence[index];

    numEl.classList.remove("intro-number-out");
    void numEl.offsetWidth;
    numEl.style.animation = "introNumberPulse 0.75s ease forwards";

    createIntroParticleBlast(window.innerWidth / 2, window.innerHeight / 2);

    setTimeout(() => {
      numEl.classList.add("intro-number-out");
    }, 650);

    setTimeout(() => {
      index++;

      if (index < sequence.length) {
        showNumber();
      } else {
        numEl.style.display = "none";
        startIntroTextSequence(introText, introSubText, introName, introHeart);
      }
    }, 1100);
  }
  showNumber();
}

function startIntroTextSequence(introText, introSubText, introName, introHeart) {
  showIntroItem(introText, 1000, () => {
    showIntroItem(introSubText, 1600, () => {
      showIntroItem(introName, 1500, () => {
        showIntroHeart(introHeart, () => {
          setTimeout(() => {
            executeCinematicReveal();
          }, 900);
        });
      });
    });
  });
}

function showIntroItem(element, visibleTime, callback) {
  if (!element) {
    if (callback) callback();
    return;
  }

  element.classList.remove("hidden-intro-text", "hide-intro-text");
  element.classList.add("show-intro-text");

  createIntroSoftSparkles();

  setTimeout(() => {
    element.classList.remove("show-intro-text");
    element.classList.add("hide-intro-text");

    setTimeout(() => {
      if (callback) callback();
    }, 650);
  }, visibleTime);
}

function showIntroHeart(heart, callback) {
  if (!heart) {
    if (callback) callback();
    return;
  }

  heart.classList.remove("hidden-intro-text");
  heart.classList.add("show-intro-heart");

  createIntroParticleBlast(window.innerWidth / 2, window.innerHeight / 2);

  setTimeout(() => {
    heart.style.transition = "opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease";
    heart.style.opacity = "0";
    heart.style.transform = "rotate(-45deg) scale(2.2)";
    heart.style.filter = "blur(18px)";

    createIntroParticleBlast(window.innerWidth / 2, window.innerHeight / 2);

    setTimeout(() => {
      if (callback) callback();
    }, 800);
  }, 1500);
}

function createIntroParticleBlast(x, y) {
  const colors = ["#ffffff", "#ff4d6d", "#00ffff", "#fffa65", "#ff9ff3"];

  for (let i = 0; i < 35; i++) {
    const p = document.createElement("div");
    p.className = "intro-particle";

    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.color = color;
    p.style.background = color;
    p.style.left = x + "px";
    p.style.top = y + "px";

    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 180;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    setTimeout(() => {
      p.style.transition = "transform 0.9s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.9s ease";
      p.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
      p.style.opacity = "0";
    }, 20);

    setTimeout(() => {
      p.remove();
    }, 950);
  }
}

function createIntroSoftSparkles() {
  const colors = ["#ffffff", "#ff4d6d", "#00ffff", "#fffa65"];

  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const s = document.createElement("div");
      s.className = "intro-particle";

      const color = colors[Math.floor(Math.random() * colors.length)];
      s.style.color = color;
      s.style.background = color;
      s.style.width = "5px";
      s.style.height = "5px";
      s.style.left = 15 + Math.random() * 70 + "%";
      s.style.top = 25 + Math.random() * 50 + "%";
      s.style.opacity = "0";

      document.body.appendChild(s);

      setTimeout(() => {
        s.style.transition = "transform 1.4s ease, opacity 1.4s ease";
        s.style.opacity = "1";
        s.style.transform = `translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(0)`;
      }, 20);

      setTimeout(() => {
        s.remove();
      }, 1450);
    }, i * 60);
  }
}

function executeCinematicReveal() {
  const intro = document.getElementById("introScreen");
  const main = document.getElementById("mainContainer");
  const audio = document.getElementById("bgMusic");

  if (audio && audio.paused) {
    audio.play().catch(() => console.log("Final reveal backup strategy invoked"));
  }

  createIntroParticleBlast(window.innerWidth / 2, window.innerHeight / 2);

  if (intro) {
    intro.classList.add("fade-out");
    intro.style.transition = "opacity 1.2s ease, transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), filter 1.2s ease";
    intro.style.opacity = "0";
    intro.style.transform = "scale(1.25)";
    intro.style.filter = "blur(20px)";

    setTimeout(() => {
      intro.style.display = "none";

      if (main) {
        main.classList.remove("hidden");
        main.style.opacity = "0";
        main.style.transform = "scale(0.96)";
        main.style.transition = "opacity 0.9s ease, transform 0.9s ease";

        requestAnimationFrame(() => {
          main.style.opacity = "1";
          main.style.transform = "scale(1)";
        });
      }

      injectDynamicNames();
      showStep(1);
    }, 1200);
  }
}

function injectDynamicNames() {
  const welcomeText = document.getElementById("welcomeText");
  const finalName = document.getElementById("finalName");
  
  if (welcomeText) welcomeText.innerHTML = `💖 For ${userName} ✨`;
  if (finalName) finalName.innerText = userName;
}

function showStep(step) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  const active = document.getElementById(`step${step}`);
  if (!active) return;
  
  active.classList.add("active");
  currentStep = step;
  updateProgress(); 

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (step === 4 && !messageStarted) {
    messageStarted = true;
    typeMessage();
  }
  if (step === 7) {
    finalFireworks();
  }
}

function nextStep() {
  if (currentStep === 1 && !fanIsOn) {
    showHint("Pehle fan ka switch ON karke candles blow kijiye! 🔌");
    return;
  }
  if (currentStep === 6 && !scrollOpened) {
    showHint("Pehle click karke Royal Scroll ko unfold kijiye! 📜");
    return;
  }
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  }
}

function updateProgress() {
  const bar = document.getElementById("progressBar");
  const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
  if (bar) bar.style.width = percent + "%";
}

function buildDiwaliWireLights() {
  const frame = document.getElementById("diwaliWireFrame");
  if (!frame) return;
  const totalBulbs = 28;

  for (let i = 0; i < totalBulbs; i++) {
    const bulb = document.createElement('div');
    bulb.classList.add('diwali-bulb');
    frame.appendChild(bulb);
    bulbsArray.push(bulb);
    
    let segment = i / totalBulbs;
    if (segment < 0.25) {
      bulb.style.top = '-8px'; bulb.style.left = (segment * 4 * 100) + '%';
    } else if (segment < 0.5) {
      bulb.style.right = '-8px'; bulb.style.top = ((segment - 0.25) * 4 * 100) + '%';
    } else if (segment < 0.75) {
      bulb.style.bottom = '-8px'; bulb.style.right = ((segment - 0.5) * 4 * 100) + '%';
    } else {
      bulb.style.left = '-8px'; bulb.style.bottom = ((segment - 0.75) * 4 * 100) + '%';
    }
  }
}

function triggerMulticolorBlink() {
  bulbsArray.forEach(bulb => {
    const pickColor = diwaliColors[Math.floor(Math.random() * diwaliColors.length)];
    bulb.style.backgroundColor = pickColor;
    bulb.style.boxShadow = `0 0 12px 4px ${pickColor}`;
  });
}

function startWindEffect() {
  const windContainer = document.getElementById("windContainer");
  if (!windContainer) return;
  windInterval = setInterval(() => {
    const streak = document.createElement("div");
    streak.classList.add("wind-streak");
    streak.style.top = Math.random() * 100 + "%";
    streak.style.animationDuration = (0.4 + Math.random() * 0.4) + "s";
    streak.style.width = (40 + Math.random() * 60) + "px";
    windContainer.appendChild(streak);
    setTimeout(() => streak.remove(), 800);
  }, 60);
}

function triggerRealisticSmoke(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const p = document.createElement("div");
      p.classList.add("smoke-particle");
      const size = (8 + Math.random() * 14) + "px";
      p.style.width = size; p.style.height = size; p.style.left = (Math.random() * 10 - 5) + "px";
      container.appendChild(p);
      setTimeout(() => p.remove(), 1600);
    }, i * 70); 
  }
}

function turnOnFanSystem() {
  if (fanIsOn) return; 
  const toggle = document.getElementById("fanSwitch");
  const fan = document.getElementById("tableFan");
  const hintText = document.getElementById("fanHint");
  const label = document.querySelector(".switch-label");
  const btn = document.getElementById("startBtn");

  fanIsOn = true;
  if (toggle) toggle.classList.add("on");
  if (label) label.innerText = "POWER ON";
  
  triggerMulticolorBlink();
  diwaliLightsInterval = setInterval(triggerMulticolorBlink, 250); 
  if (fan) fan.classList.add("spinning");
  startWindEffect(); 
  if (hintText) hintText.innerHTML = "⚡Power Active! Fan is blowing dynamic air waves...";

  setTimeout(() => {
    clearInterval(windInterval);
    document.querySelectorAll(".flame-wrapper").forEach(f => f.classList.add("off"));
    triggerRealisticSmoke("smoke2");
    triggerRealisticSmoke("smoke0");
    
    premiumCelebrationBlast(); 
    
    const magicalWish = document.createElement("div");
    magicalWish.innerHTML = `Happy Birthday<br><span style="font-size: clamp(38px, 9vw, 65px); font-weight: 700; color: #f85a33; text-shadow: 0 0 20px rgba(228, 226, 214, 0.71);">${userName}💓</span>`;
    
    magicalWish.style.position = "fixed";
    magicalWish.style.top = "45%";
    magicalWish.style.left = "50%";
    magicalWish.style.transform = "translate(-50%, 50%) scale(0.50)";
    magicalWish.style.width = "90%";
    magicalWish.style.textAlign = "center";
    magicalWish.style.zIndex = "999999"; 
    magicalWish.style.fontFamily = "'Dancing Script', cursive, sans-serif";
    magicalWish.style.fontSize = "clamp(30px, 7vw, 48px)";
    magicalWish.style.color = "#ffffff";
    magicalWish.style.letterSpacing = "2px";
    magicalWish.style.lineHeight = "1.4";
    magicalWish.style.pointerEvents = "none";
    magicalWish.style.userSelect = "none";
    magicalWish.style.opacity = "0";
    magicalWish.style.filter = "blur(10px)";
    magicalWish.style.textShadow = "0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(255,105,180,0.5)";
    magicalWish.style.transition = "opacity 2.5s cubic-bezier(0.4, 0, 0.2, 1), filter 2.5s ease-out, transform 5s ease-out";
    
    document.body.appendChild(magicalWish);
    requestAnimationFrame(() => {
      magicalWish.style.opacity = "0.9"; 
      magicalWish.style.filter = "blur(0px)"; 
      magicalWish.style.transform = "translate(-50%, -50%) scale(2.05)"; 
    });
    
    setTimeout(() => {
      magicalWish.style.transition = "opacity 2.5s ease, filter 2.5s ease, transform 3s ease";
      magicalWish.style.opacity = "0";
      magicalWish.style.filter = "blur(12px)"; 
      magicalWish.style.transform = "translate(-50%, -55%) scale(1.15)"; 
      setTimeout(() => magicalWish.remove(), 2600);
    }, 4500);

    if (hintText) hintText.innerHTML = "Shaandaar dono candles successfully bujh gayi hain!";
    if (btn) btn.classList.add("visible-btn"); 
  }, 2200); 
}

function premiumCelebrationBlast() {
  const totalItems = 75;
  const balloonColors = ['#ff4d6d', '#7c4dff', '#00d2d3', '#fffa65', '#ff9f43', '#1dd1a1'];

  for (let i = 0; i < totalItems; i++) {
    setTimeout(() => {
      const p = document.createElement("div");
      p.style.position = "fixed";
      p.style.zIndex = "99999";
      p.style.pointerEvents = "none";
      p.style.userSelect = "none";

      const typeChoice = Math.floor(Math.random() * 3);

      if (typeChoice === 0) { 
        p.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L14.8 8.4L24 11.2L14.8 14L12 24L9.2 14M0 11.2L9.2 8.4L12 0" fill="#ffff00" stroke="#fff" stroke-width="1"/></svg>`;
        p.style.left = (Math.random() * 100) + "%";
        p.style.top = "-5%";
        document.body.appendChild(p);
        let targetY = window.innerHeight * 0.85 + (Math.random() * 50);
        let driftX = (Math.random() - 0.5) * 120;
        let rotation = Math.random() * 720;
        setTimeout(() => {
          p.style.transition = "transform 3.2s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 3s ease";
          p.style.transform = `translate(${driftX}px, ${targetY}px) rotate(${rotation}deg) scale(0.4)`;
          p.style.opacity = "0";
        }, 50);

      } else if (typeChoice === 1) { 
        p.innerHTML = `<svg width="40" height="50" viewBox="0 0 40 50"><ellipse cx="20" cy="22" rx="16" ry="20" fill="${balloonColors[Math.floor(Math.random() * balloonColors.length)]}"/><path d="M19,42 Q20,46 18,50" stroke="#fff" fill="none" stroke-width="1.5"/><polygon points="20,40 16,44 24,44" fill="#fff"/></svg>`;
        p.style.left = (15 + Math.random() * 70) + "%";
        p.style.top = "65%";
        document.body.appendChild(p);
        let targetY = -(window.innerHeight * 0.8);
        let driftX = (Math.random() - 0.5) * 160;
        setTimeout(() => {
          p.style.transition = "transform 4.5s cubic-bezier(0.1, 0.2, 0.4, 1), opacity 4.2s ease";
          p.style.transform = `translate(${driftX}px, ${targetY}px) scale(1.3)`;
          p.style.opacity = "0";
        }, 50);

      } else { 
        p.style.width = (6 + Math.random() * 8) + "px";
        p.style.height = p.style.width;
        p.style.borderRadius = "50%";
        p.style.background = `radial-gradient(circle, #fff 20%, hsl(${Math.random() * 360}, 100%, 60%) 70%)`;
        p.style.boxShadow = `0 0 10px 2px hsl(${Math.random() * 360}, 100%, 60%)`;
        p.style.left = "50%";
        p.style.top = "45%";
        document.body.appendChild(p);
        let velocityX = (Math.random() - 0.5) * 480;
        let velocityY = (Math.random() - 0.6) * 420;
        setTimeout(() => {
          p.style.transition = "transform 1.8s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.6s ease";
          p.style.transform = `translate(${velocityX}px, ${velocityY}px) scale(0)`;
          p.style.opacity = "0";
        }, 50);
      }
      setTimeout(() => p.remove(), 4800);
    }, i * 25); 
  }
}

function setupPhotoUpload() {
  const input = document.getElementById("photoInput");
  const uploaded = document.getElementById("uploadedPhoto");
  const finalPhoto = document.getElementById("finalPhoto");
  const labelStatus = document.getElementById("uploadStatusText");
  const paper = document.getElementById("royalPaper");

  if (!input) return;

  input.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) {
      if (uploaded) uploaded.style.display = "none";
      if (finalPhoto) finalPhoto.style.display = "none";
      photoUploaded = false; return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      if (uploaded) { uploaded.src = ev.target.result; uploaded.style.display = "block"; }
      if (finalPhoto) { finalPhoto.src = ev.target.result; finalPhoto.style.display = "block"; }
      
      if(paper) {
        paper.style.backgroundImage = "none"; 
        paper.style.backgroundColor = "#f4ecd8";
      }

      if (labelStatus) labelStatus.innerHTML = "Image Selected!";
      photoUploaded = true;
      showHint("📸Photo successfully select ho gayi!");
    };
    reader.readAsDataURL(file);
  });
}

function saveName() {
  if (!photoUploaded) { 
    showHint("📸 Apna Photo upload kijiye pehle!"); 
    return; 
  }
  nextStep();
}

function setupHeart() {
  const heart = document.getElementById("heart");
  const msg = document.getElementById("heartMessage");
  const btn = document.getElementById("heartBtn");
  if (!heart) return;

  let messages = []; 
  let currentMessageIndex = 0;

  const handleHeartClick = (e) => {
    e.preventDefault(); 
    
    if(messages.length === 0) {
       messages = [
          `💖 ${userName}, you're completely amazing!`,
          `Haan, aap lazy ho sakti ho.. but emotionally, you're very strong💪`,
          `No matter kitne naye log aaye life me, some people are irreplaceable… And for me, that's you🫵🫣.`,
          `Har kisi ko chahiye hota hai jo bas present rhe.. mere liye wo aap ho🌸`,
          `Some people become important slowly... and then suddenly they become irreplaceable, and aap waise hi ho..✨`,
          `Aap sirf ek achhi dost nahi ho, aap woh person ho jo har situation bina bole samajh leti hai. Never changed Yourself! 💕`,
          `Aapki simplicity hi aapki sabse beautiful quality hai!!💙`,
          `Stay happy always dear!`
       ];
    }
    
    if (currentMessageIndex < messages.length) {
      if (msg) msg.innerHTML = messages[currentMessageIndex];
      currentMessageIndex++;
      
      let clickX = window.innerWidth / 2;
      let clickY = window.innerHeight / 2;
      if (e.touches && e.touches[0]) {
        clickX = e.touches[0].clientX;
        clickY = e.touches[0].clientY;
      } else if (e.clientX) {
        clickX = e.clientX;
        clickY = e.clientY;
      }
      
      createHeartExplosion(clickX, clickY);
      
      if (currentMessageIndex === messages.length) {
        showHint("All messages unlocked! 🎉");
        if (btn) btn.classList.add("visible-btn"); 
      } else {
        showHint(`✨ ${messages.length - currentMessageIndex} clicks left!`);
      }
    }
  };

  heart.addEventListener("touchstart", handleHeartClick, { passive: false });
  heart.addEventListener("click", handleHeartClick);
}

function createHeartExplosion(startX, startY) {
  for(let i = 0; i < 12; i++) {
    let h = document.createElement("div");
    h.innerHTML = "💖"; h.style.position = "fixed"; 
    h.style.left = startX + "px"; h.style.top = startY + "px";
    h.style.transform = "translate(-50%, -50%)";
    h.style.fontSize = (16 + Math.random() * 12) + "px"; 
    h.style.zIndex = "9999"; h.style.pointerEvents = "none";
    h.style.userSelect = "none";
    document.body.appendChild(h);
    
    let x = (Math.random() - 0.5) * 180; 
    let y = (Math.random() - 0.5) * 180 - 40; 
    
    setTimeout(() => {
      h.style.transition = "0.9s cubic-bezier(0.1, 0.8, 0.3, 1)";
      h.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`; 
      h.style.opacity = "0";
    }, 30);
    setTimeout(() => h.remove(), 950);
  }
}

function typeMessage() {
  const text = `✨Dear ${userName},\n\nHappy Birthday 🎂\nYou are not just a friend, aap meri life ka woh beautiful part ho jo har boring day ko special bana deta hai.\n\nKabhi kabhi kuch log itne special ban jaate hain ki unse baat kiye bina din complete nahi lagta… Thank you for being that person.\nYour smile = instant mood freshener😄\nAur honestly, aapki friendship meri life ki best cheezon me se ek hai.\n\nGoogle pe search kiya tha 'Good friend ever' but wahan aapka naam nahi aaya… kyunki aap toh limited edition unique piece ho n😌✨\n\nPata hai, aapki sabse achhi baat kya hai??🫣🫣 \nAap utna perfect nahi ho... fir bhi aap special ho, kyunki aap sab karte hue bhi humesha available rahte ho isliye \n\nKabhi aapko nind aate rahta hai, kabhi headache hote rhta hai, kabhi padhne ka mann nahi hota or kabhi kuchh kaam karne ka mood nhi hota\nLekin uske baad bhi aap sab manage kar lete ho🫵💓\nAap unlogo me se ho jo bina show off kiye, bina fake bane, bas dil se saath dete ho\n\nAur ek baat..\nKabhi bhi apne aap ko underestimate mat kijiyega.\nAap lazy ho skte ho, kabhi-kabhi thoda careless bhi lag sakte ho,\nBut your heart is genuinely beautiful💓\n\nStay happy forever… Happy 20th Birthday!💫\nThank you for everything💖`;

  const el = document.getElementById("typingText");
  const container = el ? el.closest('.glass-box-full') : null;
  const continueBtn = document.getElementById("msgContinueBtn");
  if (!el || !continueBtn) return;
  
  continueBtn.disabled = true; 
  el.innerHTML = ""; 
  let index = 0;
  
  function type() {
    if (index < text.length) { 
      let char = text[index++];
      el.innerHTML += (char === '\n') ? '<br>' : char;
      
      if (container && index % 4 === 0) {
        container.scrollTop = container.scrollHeight;
      }
      setTimeout(type, 35);
    } 
    else { 
      continueBtn.disabled = false; 
      showHint("Message completed! Aage badh sakte hain😅"); 
    }
  }
  type();
}

function setupPolaroidInteractions() {
  const cards = document.querySelectorAll(".polaroid");
  cards.forEach(card => {
    card.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease";
    
    card.addEventListener("mouseenter", () => {
      const randomTilt = (Math.random() * 8 - 4); 
      card.style.transform = `scale(1.08) rotate(${randomTilt}deg) translateY(-10px)`;
      card.style.zIndex = "100";
      card.style.boxShadow = "0 15px 35px rgba(0,0,0,0.5)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1) rotate(0deg) translateY(0)";
      card.style.zIndex = "1";
      card.style.boxShadow = "none";
    });
  });
}

function formatRoyalScrollParagraphs() {
  const scrollContent = document.querySelector(".scroll-content");
  if (!scrollContent) return;

  const paragraphs = scrollContent.querySelectorAll("p");
  paragraphs.forEach((p, index) => {
    p.style.opacity = "0";
    p.style.transform = "translateY(20px)";
    p.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
    p.style.marginBottom = "24px"; 
    p.style.borderBottom = "1px dashed rgba(138, 111, 39, 0.15)";
    p.style.paddingBottom = "12px";
  });
}

function unfoldScroll() {
  const scrollContainer = document.querySelector(".royal-scroll-container");
  const scrollPaper = document.getElementById("royalPaper");
  const scrollContent = document.querySelector(".scroll-content");
  const hint = document.getElementById("scrollHint");
  
  if(!scrollContainer || !scrollPaper || !scrollContent) return;

  if(!scrollOpened) {
    scrollContainer.classList.add("unfolded");
    
    scrollPaper.style.height = "auto";
    scrollPaper.style.transition = "none"; 
    const fullHeight = scrollContent.scrollHeight;
    scrollPaper.style.height = "0px";
    
    void scrollPaper.offsetHeight; 
    scrollPaper.style.transition = "height 2.2s cubic-bezier(0.42, 0, 0.58, 1)";
    scrollPaper.style.height = (fullHeight + 20) + "px";

    if (hint) {
      hint.style.transition = "opacity 0.5s ease"; hint.style.opacity = "0";
      setTimeout(() => hint.remove(), 550);
    }
    
    scrollOpened = true;
    showHint("📜Shahi farmaan khul chuka hai!");
    if (!scrollTypingStarted) {
      scrollTypingStarted = true;
      setTimeout(typeScrollMessage, 1500); 
    }
  }
}

function typeScrollMessage() {
  const scrollPara = document.querySelector(".scroll-content p");
  if (!scrollPara) return;

  const scrollText = `Happy Birthday 🎂✨aap officially aur ek saal or zyada pagal ho gayi😂\nLekin sach me... Thank you for being one of the sweetest people🌸\n\nMood swings, random fights, overthinking, sab tolerate karne ke liye medal milna chahiye aapko🫣🏅\n\nAapke jaisa dost milna easy nhi hota. isliye chahte hai ki aap humesha smile karti raho, stress kam liya karo or life aapko utna hi khushi de jitna aap dusro ko happiness dete ho,\n\nKhud ka dhyaan rakha kajiye samjheeeee😤\n\npani piya karo jyada jisse body relax lagega🥤\nTime pe khana khaya karo jisse body me energy rhegi🍕\n\nStay happy always dear Mahila-Mitra💖✨`;
  
  scrollPara.innerHTML = "";
  scrollPara.style.opacity = "1";
  scrollPara.style.transform = "translateY(0)";
  
  let index = 0;
  
  function type() {
    if (index < scrollText.length) {
      let char = scrollText[index++];
      scrollPara.innerHTML += (char === '\n') ? '<br>' : char;
      setTimeout(type, 30); 
    }
  }
  type();
}

function closeEntireWebsite() {
  const container = document.getElementById("mainContainer");
  const audio = document.getElementById("bgMusic");
  
  clearInterval(fireworksInterval);
  clearInterval(diwaliLightsInterval);
  clearInterval(bgGradientInterval); 
  clearInterval(watermarkInterval); 

  if (audio) {
    let fadeInterval = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume -= 0.05;
      } else {
        audio.pause();
        clearInterval(fadeInterval);
      }
    }, 100);
  }

  if (container) {
    container.style.opacity = "0";
    container.style.transform = "scale(0.9) translateY(-30px)";
    setTimeout(() => {
      container.innerHTML = `
        <div style="padding: 40px 20px; color: white; text-align: center;">
          <h1 style="font-family: 'Dancing Script', cursive; font-size: clamp(32px, 8vw, 48px); margin-bottom: 15px;">Thank you for being part of my life 💖</h1>
          <p style="opacity: 0.9; font-size: 16px; line-height: 1.6;">No matter how much time passes... some people always stay special.</p>
        </div>
      `;
      container.style.opacity = "1";
      container.style.transform = "scale(1) translateY(0)";
    }, 1000);
  }
}

function startFloatingHearts() {
  const items = ["💖", "✨", "🌸", "🎈", "💕"];
  setInterval(() => {
    const container = document.getElementById("floating-hearts-container");
    if(!container) return;
    const el = document.createElement("div");
    el.className = "floating-heart";
    el.innerHTML = items[Math.floor(Math.random() * items.length)];
    el.style.left = Math.random() * 95 + "%"; 
    el.style.fontSize = (16 + Math.random() * 16) + "px";
    el.style.animationDuration = (4 + Math.random() * 5) + "s";
    container.appendChild(el);
    setTimeout(() => el.remove(), 8000); 
  }, 500);
}

function showHint(text) {
  const box = document.getElementById("hintBox");
  if (!box) return;
  box.innerText = text; box.style.display = "block";
  if(window.hintTimeout) clearTimeout(window.hintTimeout);
  window.hintTimeout = setTimeout(() => { box.style.display = "none"; }, 2500);
}

function finalFireworks() {
  fireworksInterval = setInterval(() => {
    for (let i = 0; i < 8; i++) { 
      const f = document.createElement("div");
      f.style.position = "fixed"; f.style.width = "5px"; f.style.height = "5px"; f.style.borderRadius = "50%";
      f.style.left = (Math.random() * (window.innerWidth - 20) + 10) + "px"; 
      f.style.top = (Math.random() * (window.innerHeight - 40) + 20) + "px";
      f.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`; f.style.zIndex = "9999";
      document.body.appendChild(f);
      setTimeout(() => {
        f.style.transition = "1s ease-out"; f.style.transform = "scale(2.2)"; f.style.opacity = "0";
      }, 40);
      setTimeout(() => f.remove(), 1050);
    }
  }, 950);
}

function triggerSuhaniSpin() {
  const pool1 = ["Lazy🥱", "Unique Piece💎", "Careless🤪", "Cute Face🐼", "Nakhrebaaz💅"];
  const pool2 = ["Sleepy Queen👑", "Beautiful Heart💓", "Overthinker🧠", "Real Person💕", "Ghumakkar🚗"];
  const pool3 = ["Mahila Mitra🎀", "Limited Edition✨", "Dramebaaz🎭", "Good Friend🤝", "Superstar🌟"];

  const slot1 = document.getElementById("trait1");
  const slot2 = document.getElementById("trait2");
  const slot3 = document.getElementById("trait3");
  const spinBtn = document.getElementById("spinActionBtn");
  const nextBtn = document.getElementById("spinNextBtn");
  
  if(!slot1 || !slot2 || !slot3 || !spinBtn) return;

  spinBtn.disabled = true;
  spinBtn.innerText = "Shuffling...🎰";
  
  slot1.parentElement.classList.add("slot-rolling");
  slot2.parentElement.classList.add("slot-rolling");
  slot3.parentElement.classList.add("slot-rolling");

  let counter = 0;
  let spinTimer = setInterval(() => {
    slot1.innerText = pool1[Math.floor(Math.random() * pool1.length)];
    slot2.innerText = pool2[Math.floor(Math.random() * pool2.length)];
    slot3.innerText = pool3[Math.floor(Math.random() * pool3.length)];
    counter++;

    if (counter > 18) {
      clearInterval(spinTimer);
      
      slot1.parentElement.classList.remove("slot-rolling");
      slot2.parentElement.classList.remove("slot-rolling");
      slot3.parentElement.classList.remove("slot-rolling");
      
      spinBtn.disabled = false;
      spinBtn.innerText = "Try Luck Again 🔄";

      const finalW1 = slot1.innerText;
      const finalW2 = slot2.innerText;
      const finalW3 = slot3.innerText;

      const isLuckyHit = Math.random() > 0.65; 
      const hasSweetTraits = finalW1.includes("Unique Piece") || finalW2.includes("Beautiful Heart") || finalW3.includes("Limited Edition");

      if (isLuckyHit || hasSweetTraits) {
        spinBtn.style.display = "none"; 
        if(nextBtn) nextBtn.style.display = "inline-block"; 
        
        showHint("🎰 Jackpots Unlocked! Perfect personality traits found!");
      } else {
        showHint("Oops! Try spinning again to fetch a better combo! 🔄");
      }
    }
  }, 90);
}

function activateSpinScreenOnly() {
  const step4 = document.getElementById("step4"); 
  if(step4) {
    step4.classList.remove("active");
    step4.style.display = "none";
  }

  const spinStep = document.getElementById("suhaniSpinStep");
  if(spinStep) {
    spinStep.classList.remove("hidden-step");
    spinStep.style.display = "block";
  }
}

function goToNextScreenAfterSpin() {
  const spinStepContainer = document.getElementById("suhaniSpinStep");
  if(spinStepContainer) {
    spinStepContainer.style.display = "none"; 
    spinStepContainer.classList.add("hidden-step");
  }
  
  const wishStep = document.getElementById("friendshipWishStep");
  if(wishStep) {
    wishStep.classList.remove("hidden-step");
    wishStep.style.display = "block";
  }
}

function toggleWishMessage(boxNumber) {
  const board = document.getElementById("wishBoardText");
  if(!board) return;

  const cb2 = document.getElementById("wish2");
  const cb3 = document.getElementById("wish3");

  if(boxNumber === 2) {
    if(cb2 && cb2.checked) {
      board.innerText = "🚗 Planning mode activated! Chaahe kitni baar bhi cancel ho jaye, ek trip toh banti hai Miiitra!";
    } else {
      board.innerText = "Check the boxes above to lock our future goals! ✨";
    }
  } 
  else if(boxNumber === 3) {
    if(cb3 && cb3.checked) {
      board.innerText = "🍕 Treat Locked! Iska hisab rakh liya gaya hai website me, ab party deni hi padegi!";
    } else {
      board.innerText = "Check the boxes above to lock our future goals! ✨";
    }
  }
}

function triggerPinkyPromise() {
  const btn = document.getElementById("promiseBtn");
  const txt = document.getElementById("promiseStatusText");
  if(btn && txt) {
    txt.style.display = "block";
    btn.innerText = "🤝 Promise Locked Forever";
    btn.style.opacity = "0.7";
    btn.disabled = true;
    
    showHint("❤️ Promise registered in the database!");
  }
}

function goToMemoriesFromWishlist() {
  const wishStep = document.getElementById("friendshipWishStep");
  if(wishStep) {
    wishStep.style.display = "none";
    wishStep.classList.add("hidden-step");
  }
  
  if(typeof nextStep === "function") {
    nextStep();
  }
}

const mosaicPhotos = [
  'one.png',
  'memory_2.jpeg',
  'memory_3.jpeg',
  'four.png',
  'five.png',
  'six.png',
  'seven.png',
  'eigth.png',
  'nine.png',
  'ten.png',
  'eleven.png',
  'twelve.png',
  'thirteen.png',
  'fourteen.png',
  'fifteen.jpg',
  'sixteen.png',
  'seventeen.jpg',
  'eighteen.png',
  'ninteen.png',
  'twenty.jpg'
];

const preloadedMosaicImages = [];
mosaicPhotos.forEach((src) => {
  const img = new Image();
  img.src = src;
  preloadedMosaicImages.push(img)
});

let currentMosaicIndex = 0;
let mosaicInterval = null;

function startMosaicSlideshow() {
  const slideImg = document.getElementById('mosaicSlide');
  const counterText = document.getElementById('mosaicCounter');
  if (!slideImg) return;

  if (mosaicInterval) clearInterval(mosaicInterval);

  mosaicInterval = setInterval(() => {
    slideImg.classList.add('fade-out');

    setTimeout(() => {
      currentMosaicIndex = (currentMosaicIndex + 1) % mosaicPhotos.length;
      slideImg.src = preloadedMosaicImages[currentMosaicIndex].src;
      
      if (counterText) {
        counterText.innerText = `Photo ${currentMosaicIndex + 1} /${mosaicPhotos.length}`;
      }

      slideImg.classList.remove('fade-out');
    }, 400);

  }, 2500);
}

function goToMosaicStep() {
  const step5 = document.getElementById('step5');
  const step5b = document.getElementById('step5b');

  if (step5 && step5b) {
    step5.classList.remove('active');
    step5.classList.add('hidden-step');

    step5b.classList.remove('hidden-step');
    step5b.classList.add('active');

    startMosaicSlideshow();
  }
}

function nextStepFromMosaic() {
  if (mosaicInterval) clearInterval(mosaicInterval);
  const step5b = document.getElementById('step5b');
  const step6 = document.getElementById('step6');

  if (step5b && step6) {
    step5b.classList.remove('active');
    step5b.classList.add('hidden-step');

    step6.classList.remove('hidden-step');
    step6.classList.add('active');
  }
}
