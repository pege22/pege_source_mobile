import kaboom from "kaboom"
import loadAssets from "./assets"
//Multiplayer
const protocol = location.protocol === "https:" ? "wss" : "ws";
const ws = new WebSocket(`${protocol}://${location.host}/multiplayer`);

ws.onmessage = (msg) => {
    console.log(msg);
};
//Fixed assets load
//Added Loader 2023 LuisNet
//#FixByAlejo K3000
//CodedByLuis
//CompetPanas
//#LuisNet

kaboom({ 
debug: true,	
 scale: 1, //FixedScale
font: "apl386",
background: [ 46, 58, 81 ]
})
loadAssets()
function patrol(speed = 60, dir = 1) {
	return {
		id: "patrol",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}

function human(speed = 60, dir = 1) {
	return {
		id: "human",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}

function block(speed = 200, dir = 1) {
	return {
		id: "block",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}

function bloc(speed = 200, dir = 1) {
	return {
		id: "block",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isUp() || col.isDown()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}

function big() {
	let timer = 0
	let isBig = false
	let destScale = 1
	return {
		id: "big",
		require: [ "scale" ],
		update() {
			if (isBig) {
				timer -= dt()
				if (timer <= 0) {
					this.biggify()
				}
			}
			this.scale = this.scale.lerp(vec2(destScale), dt() * 6)
		},
		isBig() {
			return isBig
		},
		smallify() {
			destScale = 1
			timer = 0
			isBig = false
		},
		biggify(time) {
			destScale = 2
			timer = time
			isBig = true
		},
	}
}





scene("menu", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
function addButton(txt, p, f) {

	const btn = add([
		text(txt),
		pos(p),
		area({width: 200, height: 17}),
		scale(0.7),
		origin("center"),
	])

      add([
    sprite("menubg", { width: width(), height: height() }),
    z(-9999),
    fixed()
  ]);
	btn.onClick(f)

	btn.onUpdate(() => {
		if (btn.isHovering()) {
			const t = time() * 20
			btn.color = rgb(
				wave(0, 255, t),
				wave(0, 255, t + 2),
				wave(0, 255, t + 4),
			)
			btn.scale = vec2(2)
		} else {
			btn.scale = vec2(2)
			btn.color = rgb()
		}
	})

}

addButton("Join", vec2(200, 200), () => go("game"))
onTouchStart(() => {
     go("game"),{
				levelId: levelId + 3,
				coins: coins + 1000,
			};
})
add([
  text("Developers-BETA  \n V17.7.2LNET@latest", {
    font: "apl386",
    size: "40",
  })]),

onUpdate(() => cursor("default"))

})


scene("pausa", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
function addButton(txt, p, f) {

	const btn = add([
		text(txt),
		pos(p),
     go("game"),{
				levelId: levelId + 3,
				coins: coins + 1000,
			},
		area({width: 200, height: 18}),
		scale(2),
		origin("center"),
	])

      add([
    sprite("menubg", { width: width(), height: height() }),
    z(-9999),
    fixed()
  ]);
btn.onClick(() => {
     go("game"),{
				levelId: levelId + 3,
				coins: coins + 1000,
			};
})

	btn.onUpdate(() => {
		if (btn.isHovering()) {
			const t = time() * 20
			btn.color = rgb(
				wave(0, 255, t),
				wave(0, 255, t + 2),
				wave(0, 255, t + 4),
			)
			btn.scale = vec2(2)
		} else {
			btn.scale = vec2(2)
			btn.color = rgb()
		}
	})

}

addButton("Resume", vec2(775, 200), () => go("game")), {
				levelId: levelId + 3,
				coins: coins + 1000,
			};
add([
  text("Developers  \n V17.7.2LNET@latest", {
    font: "apl386", 
  })]),

onUpdate(() => cursor("sam"))

})
//Comprob
function spin(speed = 1200) {
	let spinning = false
	return {
		require: [ "rotate", ],
		update() {
			if (!spinning) {
				return
			}
			this.angle -= speed * dt()
			if (this.angle <= -360) {
				spinning = false
				this.angle = 0
			}
		},
		spin() {
			spinning = true
		},
	}
}


	const player = get("player")[0]

	function addDialog() {
		const h = 160
		const pad = 16
		const bg = add([
			pos(0, height() - h),
			rect(width(), h),
			color(0, 0, 0),
			z(100),
		])
		const txt = add([
			text("", {
				width: width(),
			}),
			pos(0 + pad, height() - h + pad),
			z(100),
		])
		bg.hidden = true
		txt.hidden = true
		return {
			say(t) {
				txt.text = t
				bg.hidden = false
				txt.hidden = false
			},
			dismiss() {
				if (!this.active()) {
					return
				}
				txt.text = ""
				bg.hidden = true
				txt.hidden = true
			},
			active() {
				return !bg.hidden
			},
			destroy() {
				bg.destroy()
				txt.destroy()
			},
		}
	}

loadSprite("sam", "/sprites/dino.png", {

sliceX: 9,

anims: {
	idle: {
			from: 0,
			to: 3,
			speed: 3,
			loop: true,
		},
		run: {
			from: 4,
			to: 7,
			speed: 10,
			loop: true,
		},

		jump: 8
	},
})
loadSprite("portal", "sprites/portal3.png", {
  sliceX: 4,
  anims: {
    idle: {
      from: 0,
      to: 3,
      loop: true,
      speed: 10
    },
  }
});

loadSprite("monedaa", "sprites/monedaa.png", {
  sliceX: 5,
  anims: {
    idle: {
      from: 0,
      to: 4,
      loop: true,
      speed: 10
    },
  }
});


loadSprite("swordd", "sprites/Swordanm.png", {
  sliceX: 4,
  anims: {
    idle: {
      from: 0,
      to: 3,
      loop: true,
      speed: 10
    },
  }
});


let BACKGROUND = "ciudadbg";
const JUMP_FORCE = 1320
const MOVE_SPEED = 300
const FALL_DEATH = 3010
const DASH__MOVE = 1200
const LEVELS = [
	[
		"p                        p",
		"p                        p",
		"p                        p",
		"p                        p",
		"p                        p",
		"p      $ $               p",
		"p     $  =      $$       p",//city
		"p    $   =     ====      p",
		"p        =               p",
		"p        = $$$$$$$$$$$  +p",
		"==========================",
	],
	[
		"p                         $       p",
		"p                        ===      p",
		"p                                 p",
		"p                  $              p",  
		"p                 ===    $        p",//city
		"p                       ===       p",
		"p             $              $    p",
		"p            ===     $      ===   p",
		"p       $           ===           p",
		"p?     ===                      ¿ p",
		"======                        =====",
	],
  [
    "p                             p",
		"p                             p",
		"p                             p",
		"p                             p",
		"p                             p",
		"p                             p",//city
		"p                             p",
		"p           $$   $$   $$      p",
		"p             $    $    $     p",
		"p                             p",
		"p       ^^  ^^   ^^   ^^     @p",
		"===============================",
	], 
	[       
		"p                                   ",
		"p                                   ",
		"p                                   ",
		"p                                   ",
		"p                               @   ",
		"p                           ======  ",
		"p    $  =             =>=           ",
		"p    $  =           =====           ",//city
		"p    $  =                           ",
		"p    $  =                           ",
		"p    >  =     =>=                   ",
		"=================                   ",
	 ],
   [
    "p                                      p",
		"p                                      p",
		"p                                      p",
		"p                                      p",
		"p                                 @    p",
		"p                             ======   p",
    "p                                      p",
    "p                                      p",
		"p              =¡         =            p",
    "p                                      p",
    "p                                      p",//city
		"p                                      p",
		"p        ====                          p",
    "p                                      p",
		"p                                      p",
		"========================================",
   ],
	 [
		"                                                                        ",
		"                    $ $ $ $ $ $               $                         ",
		"                   $   $   $   $             ===                        ",
		"                                        $                    @          ",
		"                                       ===           $     ====         ",
		"                  =>^^^>^^^>^^^                     ===                 ",
		"               ===================                                      ",
		"                                                                        ",  
		"                                                                        ",
		"      =>=                                                               ",
    "      ====    $                                     $$$$$$              ",
	  "             $ $                                   ========             ", 
		"                        $                   $                           ",
		"             ^^^       ===                 ===                          ",
		"           =======             $  $                                     ",      	
    "                             ========                                   ",
		"                                                                        ",  
		"                                                              =>=       ",//city
		"                                                      $     =====       ", 
		"                                                                        ", 
		"                                                      ^                 ",
		"                                             $     ======               ",  
		"                                                                        ",
		"                         $    $    $         ^                          ",
		"                                         =======                        ",         
    "                                                                        ",
		"                        ^^^  ^^^  ^^^                                   ",
		"============     ¡    =================                                 ",
	],
	[
  "                         ",
  "                         ",
  "                         ",
  "                         ",
  "                         ",
  "                       @ ",
  "                   ======",
  "        = f    =         ",
  "================         ",
  "                         ",
  "                         ",
  "                         ",
  "                         ",
],
[
  "                         ",
  "                         ",
  "                         ",
  "                       @ ",
  "                     ====",
  "                         ",
  "    =    f    =          ",
  "    ===========          ",
  "                         ",
  "===                      ",
  "                         ",
  "                         ",
  "                         ",
  "                         ",
],
[
  "                               ",
  "                               ",
  "       @                       ",
  "      ======                   ",
  "                               ",
  "                               ",
  "               =======         ",
  "                               ",
  "                               ",
  "                               ",
  "                         ====  ",
  "                               ",//bosque fuera
  "                               ",
  "      =  f   f   f   =         ",
  "      ================         ",
  "                               ",
  "====                           ",
],
[
  "                                                    ",
  "                                                    ",
  "      ====                                          ",
  "                                                  @ ",
  "           = f    =                             ====",
  "           ========                                 ",
  "                                                    ",
  "                                                    ",  // bosque dentro
  "                       =                 =====      ",
  "                      ===                           ",
  "                                                    ",
  "                                                    ",
  "                           = f      =              ",
  "       =============       ===========              ",
  " ===                                                ",
  "                                                    ",
],
[
  "                             ",
  "                             ",
  "          @                  ",
  "         ======              ",
  "                  f          ",
  "                 =====       ",
  "                             ",
  "                             ",
  "                       ====  ",
  "                             ",
  "               ======        ",
  "       f                     ",
  "=============                ",
],
[
  "                        ",
  "                     @  ",
  "                   ==== ",
  "    ====                ",
  "              ====      ",
  "                        ",
  "           L            ",
  "        =====           ",
  "                        ",
  "                        ",
  "                   ==== ",
  "    =====               ",
  "            =  f =      ",
  "            ======      ",
  "                        ",
  "     =====              ",
  "                        ",
  "====                    ",
  ],
  [
    "   @          ^              ",
    "   rrpp       prp     pprpp  ",
    "       prpp   <p<     <ppp   ",
    "                        p<   ",
    "                            p",
    "                            <",
    "         ^                   ",
    "       rpp           ^^      ",
    "        p    ^     prpp    p ",//ruinas
    "        <  pprpp    pp<    < ",
    "      ^    <rpp<    <p       ",
    "    rpp     <p          pp   ",
    "     r<                  p   ",
    "     <                   <   ",
    "prpp                         ",
  ],
  [
    "         rrr  ^  ^                             ",
    "         <r rrrrrrr                         ^ @",
    "             <rrr<                rr      rrrrr",
    "   rrrrr                           r      <rrr<",
    "    rrr<             rrr           <  rrr  <r  ",
    "    <r   rrr          r<r    rr        r    <  ",
    "          r<           <      <                ",
    "                                               ",
    "                                               ",
    "            rrr                                ",
    "            <r                                 ",
     "                 r    ^    rr                 ",//ruinas
    "           ^         rrrr                      ",
    "rrrr     rrrr          r  r                    ",
  ],
  [
        "        ppp            @    ",
        "        <p<     p^^^^ppp    ",
        "      ^^ <  ppp  pppp       ",
        "   ppppp                    ",
        "                            ",
        " ppp   pp                   ",
        "     ^ <p                   ",
        "    rrr          pppppppp   ",//ruinas
        "           ^     p pppp p   ",
        "         ppppp    pppppp    ",
        "         <ppp               ",
        "          <p<    pp    pp   ",
        "           <  pp   pppp     ",
        "               <            ",
        "                          pp",
        "                            ",
        "                            ",
        "              ppp ^^  ^^    ",
        "              <p<ppppppppp  ",
        "           ^   <            ",
        "ppppp    ppppp              ",
  ],
  [
    "                                                    ppp     ",
    "                                            ^             ^ ",
    "                               p   p        p    ppp    ppp ", 
    "          ^                          p     p      p         ",
    "        ppp                 p         ppppp  ppp            ",
    "         p             p p              p     p             ",
    "            p      p   < <                                 @",
    "            <      <                                      ^ ",
    "    pp                p^^^p                              ppp",
    "                      <ppp<     p    ppp             ^      ",
    "          ^ ^                   <      <            ppp     ",  //ruinas
    "        ppppp           ppppppp           ^^  ^^            ",  
    "         ppp< ^  ^^pp                    ppppppppp          ",   
    "          p   ppppp   ppp    ppp                            ", 
    "ppp       <    ppp<                                         ",  
  ],
  [
    "          M  ^       ",
    "  MM^MM   MMMM       ",
    "   MMM    MMM        ",
    "    M     MM         ",
    "        MMM   MM     ",
    "         MMM M       ",
    "     ^    MM M ^^^^^^",
    "   MMMMM  MM M MMMMMM",
    "   M M M  MM M  <MM< ",
    "  MMM MM  M          ",
    "          M^         ",//ruinas
    "          MMM        ",
    " M        M  M       ",
    "          M   M^^^M  ",
    "  ^^      M    MMM   ",
    " MMMMMM   M    <<<   ",
    " MMMMM    M          ",
    " ppp     ^p ppp   ppp",
    " rr     rrr rr     r ",
    " r       rr r        ", 
    "        ^ r r        ", 
    "      rrr r r        ",
    "       r  r r        ",   
    "     ^    r r        ",
    "   ppp    r r        ",
    "          r r        ",
    " ^        r r        ",
    " rrr      r r        ",
    "  p       p p   ppp  ",
    "          p      p   ", 
    "     ppp  p      p   ",
    "          p    p p   ",
    "          p    p p   ",
    "  pp      p    p p   ",
    "   p     ^p  ppp p   ",
    "  ppp  pppp  p p p   ",
    "          p ^p p^p^@^",
    "ppppppppppppppppppppp",
  ],
  [
    " pppp === www r  ppp M  M pp  ",
    "   p  =9=  w  r  p p MM M p p ",
    "  p   ===  w  r  ppp M MM p p ",
    " pppp = = www rr p p M  M pp  ",
    "                            @ ", 
    "prw=Mprw=Mprw=Mprw=Mprw=Mprw=M", 
  ],
  [
    "w                                      ",
    "w                                      ",
    "w      H     3                         ",
		"w   ===========                        ",
    "w                                      ", 	
    "w             H        H               ",
		"w          ===============             ",
		"w                                      ",
    "w                                      ",
    "w                          H  m         ",
		"w       H l               =======       ",
		"w      =======                         ",
		"w                                      ",
		"w            H               H        @",
		"=======================================",
    "                                       ",
    "                                       ",
    "                                       ",
    ],
  ]
const levelConf = {
	width: 64,
	height: 64,
	"=": () => [
		sprite("grass"),
		area(),
		solid(),
		origin("bot"),
  ],
  "¡": () => [
		sprite("grass"),
		area(),
		solid(),
    block(),
		origin("bot"),
  ],
  "!": () => [
		sprite("grass"),
		area(),
		solid(),
    block(),
		origin("bot"),
  ],
  "w": () => [
		sprite("wood"),
		area(),
		solid(),
		origin("bot"),
  ],
  "M": () => [
		sprite("mountain"),
		area(),
		solid(),
		origin("bot"),
  ],
  "r": () => [
		sprite("Ruins"),
		area(),
		solid(),
		origin("bot"),
  ],
		"p": () => [
		sprite("piedra"),
		area(),
		solid(),
		origin("bot"),
 ],
		"m": () => [
		sprite("mafe"),
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
"L": () => [
		sprite("letrero"),
		area({width: 40, height: 40}),
    addDialog(),
		solid(),
    scale(1.5),
		origin("bot"),
	],
	"v": () => [
		sprite("valeuwu"),
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
    "l": () => [
		sprite("developer"),
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
    "developer",
	],
	"s": () => [
		sprite("silvi"), 
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
  ],
	"B": () => [
		sprite("barbosa"), 
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
  ],
 "J": () => [
		sprite("JulyV"), 
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
  ],
  "*": () => [
		sprite("LauB"), 
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
  ],
  "Ç": () => [
		sprite("LauM"), 
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
  ],
	"C": () => [
	  sprite("carol"), 
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
  	"V": () => [
	  sprite("MajoV"), 
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
  	"N": () => [
	  sprite("NataL"), 
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
  	"S": () => [
	  sprite("SofiM"), 
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
  	"G": () => [
	  sprite("Jero"), 
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
	"c": () => [
		sprite("casti"),
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
  ],
	"H": () => [
		sprite("house"), 
		area({width: 31, height: 25}),
		solid(),
    scale(4),
		origin("bot"),
	],
   "I": () => [
		sprite("IsaB"),
		area(),
		origin("bot"),
		body(),
    scale(0.5),
		human()
	],
  "G": () => [
		sprite("GabyF"),
		area(),
		origin("bot"),
		body(),
    scale(0.),
	  human()
	],
  "j": () => [
		sprite("juanitaI"),
		area(),
		origin("bot"),
		body(),
    scale(2.1),
		human(),
	],
	"9": () => [
		sprite("pavo"),
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
  "3": () => [
		sprite("mateo"),
		area({width: 11, height: 16}),
		solid(),
    scale(2.1),
		origin("bot"),
    human()
	],
	"$": () => [
		sprite("monedaa", { anim: 'idle' }),
		area(),
		pos(0, -9),
    scale(3),
		origin("bot"),
		"coin",
	],
"2": () => [
		sprite("gem"),
		area(),
		pos(0, -9),
		origin("bot"),
		"gem",
	],
  "6": () => [
		sprite("gemp1"),
		area(),
		pos(0, -9),
		origin("bot"),
		"gem",
	],
  "7": () => [
		sprite("gemp2"),
		area(),
		pos(0, -9),
		origin("bot"),
		"gem",
	],
  "4": () => [
		sprite("gemp3"),
		area(),
		pos(0, -9),
		origin("bot"),
		"gem",
	],
  "5": () => [
		sprite("gemp4"),
		area(),
		pos(0, -9),
		origin("bot"),
		"gem",
	],
	"%": () => [
		sprite("prize"),
		area(),
		solid(),
		origin("bot"),
		"prize",
	],
	"^": () => [
		sprite("spike"),
		area(),
		solid(),
		origin("bot"),
		"danger",
		],
	"<": () => [
		sprite("spikevoltiado"),
		area({width: 35, height: 20}),
    pos(0, -40),
		origin("bot"),
		"danger",
	],
	"#": () => [
		sprite("apple"),
		area(),
		origin("bot"),
		body(),
		"apple",
	],
	">": () => [
		sprite("ghosty"),
		area(),
		origin("bot"),
		body(),
		patrol(),
		"enemy",
	],
  "f": () => [
		sprite("forest1"),
		area(),
		origin("bot"),
		body(),
    scale(0.5),
		patrol(),
		"enemy",
	],
	"@": () => [
		sprite("portal", { anim: 'idle' }),
		area({width: 64, height: 64}),
		origin("bot"),
		pos(0, -12),
		"portal",
	],
  "+": () => [
		sprite("portal", { anim: 'idle' }),
		area({width: 64, height: 64}),
		origin("bot"),
		pos(0, -12),
		"popocine1",
	],
  "¿": () => [
		sprite("portal", { anim: 'idle' }),
		area({width: 64, height: 64}),
		origin("bot"),
		pos(0, -12),
		"popopocine2",
	],
  	"?": () => [
		sprite("portal", { anim: 'idle' }),
		area({width: 64, height: 64}),
		origin("bot"),
		pos(0, -12),
		"otroportal",
	],
}







scene("game", ({ levelId, coins, anims } = { levelId: 0, coins: 0 }) => {
gravity(3200)


  

const level = addLevel(LEVELS[levelId ?? 0], levelConf)
const dialog = addDialog()
let myCheckpoint = vec2(177, 179)
let myCheckpointfix = vec2(140, 116)


    add([
    sprite(BACKGROUND, { width: width(), height: height() }),
    z(-9999),
    fixed()
  ]);
const player = add([
	sprite("sam", { anim: 'idle' }),
	pos(80, 180),
	origin("center"),
	area({width: 10, height: 20}),
	body({ jumpForce: JUMP_FORCE, }),
  scale(22),
  big(),
  rotate(0),
	spin(),
	origin("bot"),
])
player.onCollide("developer", async (ch) => {//text
	dialog.say("Onichaaaaaaaaaaaaaaaan")
  await wait (2)
  dialog.destroy()
})
  
player.onUpdate(() => {
     if(player.pos.x > 210) { 
         myCheckpointfix = vec2(140, 116);
     }
})



player.onGround(() => {
	if (!isKeyDown("left") && !isKeyDown("right")) {
		player.play("idle")
	} else {
		player.play("run")
	}
})
	player.onDoubleJump(() => {
		player.spin()
	})


onKeyPress("space", () => {
	if (player.isGrounded()) {
    player.doubleJump()
		player.jump(JUMP_FORCE)
    player.biggify(3)
		player.play("jump")
	}
})
	
	onKeyPress("up", () => {
	if (player.isGrounded()) {
		player.jump(JUMP_FORCE)
    player.biggify(4)
		player.play("jump")
	}
})

onKeyDown("left", () => {
	player.move(-MOVE_SPEED, 0)
	player.flipX(true)
  player.biggify(5)
	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})

onKeyDown("right", () => {
	player.move(MOVE_SPEED, 0)
	player.flipX(false)
  player.biggify(5)
	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})
  
onKeyDown("c", async () => {
	player.move(DASH__MOVE, 0)
	player.flipX(false)
  player.biggify(5)
	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})


onKeyRelease(["left", "right"], () => {
	if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
player.play("idle")
	}
})


	player.onUpdate(() => {

		camPos(player.pos)

		if (player.pos.y >= FALL_DEATH) {
			player.pos = myCheckpoint;
		}
	})

	player.onCollide("danger", () => {
		player.pos = myCheckpoint;
		play("hit")
	})

	player.onCollide("portal", async () => {
		play("portal")
		//location.href = "https://luisweb.cf/pege/cinematic"
    await wait(1)
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		} else {
			go("win")
		}
      if (levelId < 6) {
        BACKGROUND = "ciudadbg"
      }
     if (levelId == 6) {
        BACKGROUND = "bfuerabg"
      }
     if (levelId == 7) {
        BACKGROUND = "bfuerabg"
      }
      if (levelId == 8) {
        BACKGROUND = "forestbg"
      }
      if (levelId == 9) {
        BACKGROUND = "bfuerabg"
      }
    })
	player.onCollide("popocine1", async () => {
		play("portal")
		//location.href = "https://luisweb.nl/pege/cinematic"
    await wait(1)
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		} else {
			go("win")
		}
      if (levelId < 6) {
        BACKGROUND = "ciudadbg"
      }
     if (levelId == 6) {
        BACKGROUND = "bfuerabg"
      }
     if (levelId == 7) {
        BACKGROUND = "bfuerabg"
      }
      if (levelId == 8) {
        BACKGROUND = "forestbg"
      }
      if (levelId == 9) {
        BACKGROUND = "bfuerabg"
      }
    })
	player.onCollide("popopocine2", async () => {
		play("portal")
		//location.href = "https://luisweb.nl/pege/cinematic"
    await wait(1)
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		} else {
			go("win")
		}
      if (levelId < 6) {
        BACKGROUND = "ciudadbg"
      }
     if (levelId == 6) {
        BACKGROUND = "bfuerabg"
      }
     if (levelId == 7) {
        BACKGROUND = "bfuerabg"
      }
      if (levelId == 8) {
        BACKGROUND = "forestbg"
      }
      if (levelId == 9) {
        BACKGROUND = "bfuerabg"
      }
    })

  player.onCollide("otroportal", async () => {
		play("portal")
		//location.href = "https://luisweb.nl/pege/cinematic"
    await wait(0.5)
		if (levelId - 1 < LEVELS.length) {
			go("game", {
				levelId: levelId - 1,
				coins: coins,
			})
		} else {
			go("win")
		}
    if (levelId == 2) {
        BACKGROUND = "forestbg"
      } 
     if (levelId == 3) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 4) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 5) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 6) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 7) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 8) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 9) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 10) {
        BACKGROUND = "ruinasbg"
      }
    })


	player.onGround((l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.5)
			play("powerup")
		}
	})

player.onCollide("player", "enemy", (p, e) => {
    player.pos = myCheckpoint;
})


	player.onCollide("enemy", (e, col) => {
if (!col.isBottom()) {
			play("hit")
      player.pos = myCheckpoint;
		}
	})

	let hasApple = false


	player.onHeadbutt((obj) => {
		if (obj.is("prize") && !hasApple) {
			const apple = level.spawn("#", obj.gridPos.sub(0, 1))
			apple.jump()
			hasApple = true
			play("blip")
		}
	})


	player.onCollide("apple", (a) => {
		destroy(a)

		player.biggify(5)
		hasApple = false
		play("powerup")
	})

	let coinPitch = 0

	onUpdate(() => {
		if (coinPitch > 0) {
			coinPitch = Math.max(0, coinPitch - dt() * 100)
		}
	})

	player.onCollide("coin", (c) => {
		destroy(c)
    player.biggify(5)
		play("coin", {
			detune: coinPitch,
		})
		coinPitch += 100
		coins += 1
		coinsLabel.text = coins
	})

player.onCollide("gem", (c, p) => {
	player.move(100)
  destroy(c, p)
  play("yei")
  player.jump(JUMP_FORCE * 1.2)
	})

  
	const coinsLabel = add([
		text(coins),
		pos(24, 24),
		fixed(),
	])
  
  const keyDown = {
    left: false,
    right: false
  }
  //literalmente todo el sistema de controles para telefono (android) (ios) 
  //constante de salto + A (Actionbtn)
const saltauwu = () => {

		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
      player.play("jump")
      player.biggify(5)
		}
	}
//Llamar a la constante para que haga lo mismo que "space"
	onKeyPress("space", saltauwu)
const moveLeft = () => {
		player.move(-MOVE_SPEED, 0)
    player.biggify(5)
	}
  const moveRight = () => {
    	player.move(MOVE_SPEED, 0)
    player.biggify(5)
  }
	onKeyDown("left", () => {
    keyDown.left = true
    player.play("run")
  })
  onKeyRelease("left", () => {
    keyDown.left = false
  })

	onKeyDown("right", () => {
	keyDown.right = true
  player.play("run")
	})

    onKeyRelease("right", () => {
    keyDown.right = false
  })

  onUpdate(() => {
    if (keyDown.left) {
      moveLeft()
    }
    else if (keyDown.right) {
      moveRight()
    }
  })
  onKeyPress("c", () => {
		player.move(DASH__MOVE, 0)
    player.biggify(5)
    player.weight = 5
	})

	onKeyPress("down", () => {
		player.weight = 3
    
	})
  /*
const botonizquierdo = add([
  sprite ("left"),
  pos (10, height() - 100),
  opacity(0.5),
  fixed(),
  area()
  ])


const botonderecho = add([
  sprite ("right"),
  pos (120, height() - 100),
  opacity(0.5),
  fixed(),
  area()
  ])
  */
  const elsupera = add([
    sprite("boton"),
    pos (width() -120, height() - 100),
    opacity(0.5),
    fixed(),
    area(),
  ])

  onTouchStart((id, pos) => {
    /*
    if (botonizquierdo.hasPoint(pos)) {
      keyDown.left = 1
      keyDown.left = true
      player.play("run")
      botonizquierdo.opacity = 1
    }

      if (botonderecho.hasPoint(pos)) {
        keyDown.right = 1
        player.play("run")
        keyDown.right = true
        botonderecho.opacity = 1
        
      }
      */
        if (elsupera.hasPoint(pos)) {
          //saltar owo
          saltauwu()
          elsupera.opacity = 1
        }
  })

 
    const onTouchChanged = (_, pos) => {
       /*
    if (!botonizquierdo.hasPoint(pos)) {
      keyDown.left === 1
      keyDown.left = false
      botonizquierdo.opacity = 0.5
    }
    else {
      keyDown.left = true
      botonizquierdo.opacity = 1
      
    }
   
     if (!botonderecho.hasPoint(pos)) {
      keyDown.right = false
      keyDown.right === 2
      botonderecho.opacity = 0.5
    }
        else {
          
      keyDown.right = true
      botonderecho.opacity = 1
      
    }
       */
     if (!elsupera.hasPoint(pos)) {
      elsupera.opacity = 0.5
    }
    else {
      elsupera.opacity = 1
      
    }
    
  }
  //onTouchMove(onTouchChanged)
  onTouchEnd(onTouchChanged)
	onKeyRelease("down", () => {
		player.weight = 1
    //player.pos = myCheckpoint;
		//fixed spawnpoint on Key release
	})

  let rightDown = null
const right = add([
    fixed(),
    sprite("right"),
    pos (120, height() - 100),
    area(),
    color()
])

onTouchStart((id, pos) => {
    //console.log("start")
  if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("idle")
	}
    if (right.hasPoint(pos)) {
        rightDown = id
        right.color = RED
    }
})

onTouchEnd((id, pos) => {
    if (rightDown === id) {
        rightDown = null
        right.color = WHITE
    }
})

onUpdate(() => {
    if (rightDown !== null) {
        player.move(MOVE_SPEED,0)
    }
})
let leftDown = null
const left = add([
    fixed(),

  	player.flipX(false),
    sprite("left"),
    pos (10, height() - 100),
    area(),
    color()
])

onTouchStart((id, pos) => {
    //console.log("start")
    //player.play("run")
    if (left.hasPoint(pos)) {
        leftDown = id
        left.color = BLUE
    }
})

onTouchEnd((id, pos) => {
  player.play("idle")
    if (leftDown === id) {
        leftDown = null
        left.color = WHITE
    }
})

onUpdate(() => {
    if (leftDown !== null) {
        player.move(-MOVE_SPEED, 0)
    }
})
	onKeyPress("f", () => {
		fullscreen(!fullscreen())
	})

  	onKeyPress("escape", () => {
		go("pausa")
	})
		onKeyPress("f8", () => {
		add([
			text("tramposo - 0.5")
			])
			
	})
	 onKeyPress("o", () => {
    wait(0.2, () => {
      if (levelId + 1 < LEVELS.length) {
        go("game", {
          levelId: levelId - 1,
        });
      } else {
        go("win");
      }
      if (levelId == 2) {
        BACKGROUND = "icebg"
      } else {
        BACKGROUND = "ruinasbg"
      }
    })
  });
			onKeyPress("p", () => {
        fullscreen(!fullscreen())
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		}
			
	})
                  
})

scene("lose", () => {
	add([
		text("NOT USED, HOWEVER DEVELOPERS KNOW WHAT THEY DO ;)"),
	])
	onKeyRelease(() => {
    go("game")
	})
})

scene("win", () => {
	add([
		text("Thank you for playing the game"),
	])
	onKeyPress(() => go("game"))
})

go("menu")
//By SOME 7D students