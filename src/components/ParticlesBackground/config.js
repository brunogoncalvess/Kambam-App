const particlesConfig = {
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ffffff",
        animation: {
          enable: true,
          speed: 15,
          sync: true
        }
      },
      opacity: {
        value: 0.5
      },
      size: {
        value: {
          min: 0.1,
          max: 3
        }
      },
      links: {
        enable: true,
        distance: 100,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: .7,
        direction: "none",
        outModes: {
          default: "out"
        }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse"
        },
        onClick: {
          enable: false,
          mode: "push"
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 100
        },
        push: {
          quantity: 4
        }
      }
    },
    detectRetina: true,
    background: {
      color: "#000000"
    }
  }

export default particlesConfig