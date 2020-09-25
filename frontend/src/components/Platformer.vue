<template>
  <div class="hello">
    <div @click="initializeGame" class="flex">
      <a href="#1" class="btn">Initialize</a>
    </div>
    <ion-phaser v-bind:game.prop="game" v-bind:initialize.prop="initialize" />
  </div>
</template>

<script>
import Phaser from "phaser";
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

export default {
  data() {
    return {
      initialize: false,
      game: config,
    };
  },
  created() {},
  methods: {
    initializeGame() {
      this.initialize = true;
    },
  },
};

function preload() {
  // map made with Tiled in JSON format
  this.load.tilemapTiledJSON("map", "assets/map.json");
  // tiles in spritesheet
  this.load.spritesheet("tiles", "assets/tiles.png", {
    frameWidth: 70,
    frameHeight: 70,
  });
  // simple coin image
  this.load.image("coin", "assets/coinGold.png");
  this.load.spritesheet("hvt", "assets/llama.png", {
    frameWidth: 48,
    frameHeight: 48,
  });
}

var map;
var player;
var cursors;
var groundLayer, coinLayer;
var score = 0;
var text;

function create() {
  //load the map
  map = this.make.tilemap({ key: "map" });
  // tiles for the ground layer
  var groundTiles = map.addTilesetImage("tiles");

  // create the ground layer
  groundLayer = map.createDynamicLayer("World", groundTiles, 0, 0);
  // the player will collide with this layer
  groundLayer.setCollisionByExclusion([-1]);

  // coin image used as tileset
  var coinTiles = map.addTilesetImage("coin");
  // add coins as tiles
  coinLayer = map.createDynamicLayer("Coins", coinTiles, 0, 0);

  // set the boundaries of our game world
  this.physics.world.bounds.width = groundLayer.width;
  this.physics.world.bounds.height = groundLayer.height;

  // The player and its settings
  player = this.physics.add.sprite(100, 450, "hvt");

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.physics.add.collider(groundLayer, player);
  coinLayer.setTileIndexCallback(17, collectCoin, this); // the coin id is 17
  // when the player overlaps with a tile with index 17, collectCoin will be called
  this.physics.add.overlap(player, coinLayer);

  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  // make the camera follow the player
  this.cameras.main.startFollow(player);

  // set background color, so the sky is not black
  this.cameras.main.setBackgroundColor("#ccccff");

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("hvt", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "hvt", frame: 0 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("hvt", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  text = this.add.text(20, 570, "0", {
    fontSize: "20px",
    fill: "#ffffff",
  });
  text.setScrollFactor(0);
}

function update() {
  if (cursors.left.isDown) {
    // if the left arrow key is down
    player.body.setVelocityX(-200); // move left
    player.flipX = true;
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    // if the right arrow key is down
    player.body.setVelocityX(200); // move right
    player.flipX = false;
    player.anims.play("left", true);
  } else {
    player.body.setVelocityX(0);
    player.anims.play("turn", true);
  }

  if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
    player.body.setVelocityY(-500); // jump up
  }
}

function collectCoin(sprite, tile) {
  coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
  score++; // increment the score
  text.setText(score); // set the text to show the current score
  return false;
}
</script>
