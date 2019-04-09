<!-- 单机版，未完成 -->
<template>
  <div id="appself">
    <div id="bg">
      <!-- <div id="player" class="player" style="width: 8.33%;height: 15%;position: fixed;/* margin-left: 91.67%; */margin-bottom: 0%;"><div>玩家一</div><img src="/static/img/player.png" class="playerImg" alt="玩家"></div> -->
      <div id="top">
        <div class="row-room">北极</div>
        <div class="row-room">芬兰<br>$3200</div>
        <div class="row-room">丹麦<br>$2800</div>
        <div class="row-room">意大利<br>$1400</div>
        <div class="row-room" style="color:yellow">命运</div>
        <div class="row-room">西班牙<br>$1400</div>
        <div class="row-room">埃及<br>$1800</div>
        <div class="row-room">赞比亚<br>$600</div>
        <div class="row-room" style="color:red">机会</div>
        <div class="row-room">加拿大<br>$3500</div>
        <div class="row-room">美国<br>$3500</div>
        <div class="row-room" style="color:blue">监狱</div>
      </div>

      <div id="middle">
        <div id="middle-left">
          <div class="col-room">英国<br>$2200</div>
          <div class="col-room" style="color:red">机会</div>
          <div class="col-room">俄罗斯<br>$1000</div>
          <div class="col-room" style="color:yellow">命运</div>
          <div class="col-room">土耳其<br>$3500</div>
        </div>
        <div id="middle-middle">

          <!-- 骰子 -->
          <div id="big-dice">
            <div id="group">
              <div class="page" id="page1">
                <span></span>
              </div>
              <div class="page" id="page2">
                <span></span>
                <span></span>
              </div>
              <div class="page" id="page3">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="page" id="page4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="page" id="page5">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="page" id="page6">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <!-- 小骰子 -->
          <div id="small-dice">
            <div id="group2">
              <div class="small-page" id="page1">
                <span></span>
              </div>
              <div class="small-page" id="page2">
                <span></span>
                <span></span>
              </div>
              <div class="small-page" id="page3">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="small-page" id="page4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="small-page" id="page5">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="small-page" id="small-page6">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div id="throw_dice">
            <button @click="run(1)">掷骰子</button>
          </div>
        </div>
        <div id="middle-right">
          <div class="col-room">墨西哥<br>$1000</div>
          <div class="col-room" style="color:yellow"
          >命运</div>
          <div class="col-room">巴拿马<br>$3200</div>
          <div class="col-room">巴西<br>$2600</div>
          <div class="col-room">澳大利亚<br>$3200</div>
        </div>
      </div>

      <div id="bottom">
        <div class="row-room" style="color:blue">监狱</div>
        <div class="row-room">叙利亚<br>$3500</div>
        <div class="row-room">沙特阿拉伯<br>$1800</div>
        <div class="row-room">伊朗<br>$2000</div>
        <div class="row-room">太平洋</div>
        <div class="row-room">印度<br>$1400</div>
        <div class="row-room">菲律宾<br>$600</div>
        <div class="row-room">韩国<br>$1000</div>
        <div class="row-room" style="color:red">机会</div>
        <div class="row-room">日本<br>$1000</div>
        <div class="row-room">中国<br>$4000</div>
        <div class="row-room" id="start">
          起点
          <!-- <div>玩家一</div>
          <img src="/static/img/player.png" id="player" alt="玩家"> -->
        </div>
      </div>
    </div>
    <div id="info">
      <div id="playerInfo" >
        <!-- <div v-for="player in players" v-bind="player._id">
          <div class="user">
            <div class="userColor"></div>
            <div class="userName">{{player.username}}</div>
            <div class="money">{{player.money}}</div>
          </div>
        </div> -->
        <table class="user">
          <!-- <tr v-for="player in players">
            <th><div class="userColor"></div></th>
            <th class="userName">{{player.username}}</th>
            <th class="money">{{player.money}}</th>
          </tr> -->
        </table>
        <!-- <el-table :data="players">
          <el-table-column label="颜色" align="center" prop="apiname"/>
          <el-table-column label="名称" align="center" prop="username"/>
          <el-table-column label="金钱" align="center" prop="money"/>
        </el-table> -->
      </div> 
      <div id="gameInfo">
        <pre id="console" style="margin: 0"></pre>
        <!-- <pre></pre> -->
      </div>
      <!-- <div>玩家一：{{players.player1.money}}</div> -->
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{dialogText}}</span>
      <span slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="buy()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import user from "@/api/user";
import game from "@/api/game";
// const io = require('vue-socket.io')

export default {
  name: "App",
  data() {
    return {
      playerNum: 1,
      currentPlayer: "",
      players: {
        player1: {
          step: 0,
          money: 15000,
          position: {
            x: 91.67,
            y: 85.815
          }
        }
      },
      // players: [],
      // socket: "",
      dialogVisible: false,
      dialogText: "是否够买",
      country: {
        0: {
          type: "start",
          country: "起点",
          price: 0
        },
        1: {
          type: "place",
          country: "中国",
          price: 4000
        },
        2: {
          type: "place",
          country: "日本",
          price: 1000
        },
        3: {
          type: "chance",
          country: "机会",
          price: 0
        },
        4: {
          type: "place",
          country: "韩国",
          price: 1000
        },
        5: {
          type: "place",
          country: "菲律宾",
          price: 600
        },
        6: {
          type: "place",
          country: "印度",
          price: 1400
        },
        7: {
          type: "ocean",
          country: "太平洋",
          price: 0
        },
        8: {
          type: "place",
          country: "伊朗",
          price: 2000
        },
        9: {
          type: "place",
          country: "沙特阿拉伯",
          price: 1800
        },
        10: {
          type: "place",
          country: "叙利亚",
          price: 3500
        },
        11: {
          type: "prison",
          country: "监狱",
          price: 0
        },
        12: {
          type: "place",
          country: "土耳其",
          price: 3500
        },
        13: {
          type: "fate",
          country: "命运",
          price: 0
        },
        14: {
          type: "place",
          country: "俄罗斯",
          price: 1000
        },
        15: {
          type: "chance",
          country: "机会",
          price: 0
        },
        16: {
          type: "place",
          country: "英国",
          price: 2200
        },
        17: {
          type: "ocean",
          country: "北极",
          price: 0
        },
        18: {
          type: "place",
          country: "芬兰",
          price: 3200
        },
        19: {
          type: "place",
          country: "丹麦",
          price: 2800
        },
        20: {
          type: "place",
          country: "意大利",
          price: 1400
        },
        21: {
          type: "fate",
          country: "命运",
          price: 0
        },
        22: {
          type: "place",
          country: "西班牙",
          price: 1400
        },
        23: {
          type: "place",
          country: "埃及",
          price: 1800
        },
        24: {
          type: "place",
          country: "赞比亚",
          price: 600
        },
        25: {
          type: "chance",
          country: "机会",
          price: 0
        },
        26: {
          type: "place",
          country: "加拿大",
          price: 3500
        },
        27: {
          type: "place",
          country: "美国",
          price: 3500
        },
        28: {
          type: "prison",
          country: "监狱",
          price: 0
        },
        29: {
          type: "place",
          country: "墨西哥",
          price: 1000
        },
        30: {
          type: "fate",
          country: "命运",
          price: 0
        },
        31: {
          type: "place",
          country: "巴拿马",
          price: 3200
        },
        32: {
          type: "place",
          country: "巴西",
          price: 2600
        },
        33: {
          type: "place",
          country: "澳大利亚",
          price: 3200
        }
      },
      fates: {
        1: {
          text: "破获泰北毒品走私案",
          result: "奖金1000元",
          effect: 1000
        },
        2: {
          text: "金字塔内，寻得宝藏",
          result: "得2000元",
          effect: 2000
        },
        3: {
          text: "遭受原子弹轰炸",
          result: "损失500元",
          effect: -500
        },
        4: {
          text: "吃韩国烧烤",
          result: "付200元",
          effect: -200
        },
        5: {
          text: "跳西班牙舞、舞姿美妙",
          result: "前进二步", // 得200元
          effect: 200
        },
        6: {
          text: "畅游狄斯尼乐园",
          result: "门票200元",
          effect: -200
        },
        7: {
          text: "进入影城，好莱坞当明星",
          result: "得1000元",
          effect: 1000
        },
        8: {
          text: "梦见埃及艳后",
          result: "赏赐500元",
          effect: 500
        },
        9: {
          text: "泛莱茵河",
          result: "船租金1000",
          effect: -1000
        },
        10: {
          text: "衡越英吉利海峡",
          result: "精神奖励1000元",
          effect: 1000
        },
        11: {
          text: "击落战斗机",
          result: "得奖金300元",
          effect: 3000
        },
        12: {
          text: "环游世界、第一天晕船",
          result: "暂停一次",
          effect: 0
        },
        13: {
          text: "付户税",
          result: "房屋每幢250元\n旅馆每幢1000元",
          effect: 0
        },
        14: {
          text: "到夏威夷度假",
          result: "如经过起点得2000元",
          effect: 0
        },
        15: {
          text: "与木乃伊合照冲洗相片",
          result: "费用300元",
          effect: -300
        },
        16: {
          text: "登喜马拉雅山成功",
          result: "奖励金1000元",
          effect: 1000
        },
        17: {
          text: "参加世界小姐选美",
          result: "奖金500元",
          effect: 500
        },
        18: {
          text: "飞机跌落太平洋",
          result: "退回起点",
          effect: 0
        },
        19: {
          text: "渴死在撒哈拉沙漠",
          result: "得救济金1000元",
          effect: 1000
        },
        20: {
          text: "进入银月城，维也纳",
          result: "付学费1000元",
          effect: -1000
        }
      },
      chances: {
        1: {
          text: "畅游尼加拉瓜",
          result: "可在翻下一张机会",
          effect: 0
        },
        2: {
          text: "直飞美国、会见白马王子从事政治",
          result: "如经过起点得2000元",
          effect: 2000
        },
        3: {
          text: "为登月第一人",
          result: "得500元",
          effect: 500
        },
        4: {
          text: "观赏西班牙斗牛",
          result: "门票200分",
          effect: -200
        },
        5: {
          text: "太空船故障",
          result: "时区所有现金1/10",
          effect: 0
        },
        6: {
          text: "巴黎铁塔一日游",
          result: "买香水1000元",
          effect: -1000
        },
        7: {
          text: "能源危机解除，经济复苏",
          result: "获利2500元",
          effect: 2500
        },
        8: {
          text: "破奥运会记录",
          result: "得奖金2000元",
          effect: 2000
        },
        9: {
          text: "荣获诺贝尔奖金",
          result: "得3000元",
          effect: 3000
        },
        10: {
          text: "误入食人族",
          result: "损失600元",
          effect: -600
        },
        11: {
          text: "飞机失事（美国大峡谷）",
          result: "损失1000元",
          effect: -1000
        },
        12: {
          text: "经过梵蒂冈，拜见教宗",
          result: "得1000元",
          effect: 1000
        },
        13: {
          text: "变魔术，自由女神像不见了",
          result: "酬劳2000元",
          effect: 2000
        },
        14: {
          text: "付户说",
          result: "房屋每幢250元\n旅馆每幢1000元",
          effect: 0
        },
        15: {
          text: "拉斯维加斯赌博，现金输光",
          result: "每人救济1000元",
          effect: 0
        },
        16: {
          text: "探险被人面兽身怪兽侵袭",
          result: "损失300元",
          effect: -300
        },
        17: {
          text: "英国女王接见",
          result: "赏500元",
          effect: 500
        },
        18: {
          text: "载游客游览尼罗河风光",
          result: "得300分",
          effect: 300
        },
        19: {
          text: "越南沦亡",
          result: "退回起点",
          effect: 0
        },
        20: {
          text: "违章建筑",
          result: "罚款500元",
          effect: -500
        }
      }
    };
  },
  created() {
    // console.log(this.$websocket,"websocket")
  },
  mounted() {
    // 创建玩家
    // let player = document.createElement("div");
    // player.id = "player";
    // player.className = "player";
    // let name = document.createElement("div");
    // // name.textContent = "玩家一";
    // name.style.height = "25px";
    // player.appendChild(name);
    // let img = document.createElement("img");
    // img.src = "/static/img/player.png";
    // img.className = "playerImg";
    // img.alt = "玩家";
    // player.appendChild(img);
    // player.style.width = "8.33%";
    // player.style.height = "15%";
    // player.style.position = "absolute";
    // player.style.left = "91.67%";
    // player.style.top = "85.815%";
    // document
    //   .getElementById("bg")
    //   .insertBefore(player, document.getElementById("top"));

    // document.getElementById("bg").appendChild(player);

    // 加入房间
    // 连接websocket
    // console.log('socket: ', this.$socket)
    // const io =require();
    // // this.socket = io("ws://localhost:7008/", {
    // //   // const socket = io('ws://www.pxiou.club/', {
    // //   transports: ["websocket"]
    // // });
    this.$socket.on("connect", () => {
      // const id = socket.id;
      console.log("#connect");
    });
    // this.$socket.emit("test", {
    //   token: localStorage.richman_token,
    //   name: "richman-room-336",
    //   max: 8
    // });
    this.$socket.emit("joinRoom", {
      token: localStorage.richman_token,
      roomId: "richman-room-336"
    });
    this.$socket.on("richman-room-336", msg => {
      // const id = socket.id;
      console.log("来自336的消息： " + msg);
    });

    this.getCurrentPlayer();
  },
  methods: {
    getCurrentPlayer() {
      user
        .current()
        .then(res => {
          // console.log('cuu res: ', res)
          this.currentPlayer = res.data._id;
          this.getRoomUsers();
        })
        .catch(e => {
          console.log("error: ", e);
        });
    },
    getRoomUsers() {
      game
        .getUserByRoom("richman-room-336")
        .then(res => {
          console.log("ressss: ", res);
          this.players = res.data;

          for (let pl in res.data) {
            console.log("key  : ", pl);
            // 创建玩家
            let player = document.createElement("div");
            player.id = pl;
            // player.id = this.currentPlayer;
            player.className = "player";
            let name = document.createElement("div");
            // name.textContent = "玩家一";
            name.style.height = "25px";
            player.appendChild(name);
            let img = document.createElement("img");
            img.src = "/static/img/player.png";
            img.className = "playerImg";
            img.alt = "玩家";
            player.appendChild(img);
            player.style.width = "8.33%";
            player.style.height = "15%";
            player.style.position = "absolute";
            player.style.left = "91.67%";
            player.style.top = "85.815%";
            document
              .getElementById("bg")
              .insertBefore(player, document.getElementById("top"));
          }
        })
        .catch(e => {
          console.log("error: ", e);
        });
    },

    buy() {
      console.log("11111");

      console.log("step: ", this.players[this.currentPlayer].step);
      console.log(
        "价格：",
        this.country[this.players[this.currentPlayer].step].price
      );
      this.players[this.currentPlayer].money -= this.country[
        this.players[this.currentPlayer].step
      ].price;
      this.dialogVisible = false;
    },
    run(step) {
      // console.log(step);
      // let player = document.getElementById('player');
      // player.style = 'transform: translate(-200px,0px);';

      let dice = document.getElementById("big-dice");
      let smallDice = document.getElementById("group2");

      // 隐藏小骰子，显示骰子动画
      smallDice.style.display = "none";
      dice.style.display = "block";
      // console.log(dice);

      setTimeout(() => {
        // 获得骰子点数
        let random = Math.floor(Math.random() * 6) + 1;
        if (random === 7) {
          random = 6;
        }

        // 扔完骰子后显示点数
        if (random === 1) {
          smallDice.style.transform = "rotateX(45deg) rotateZ(-45deg)";
        } else if (random === 2) {
          smallDice.style.transform =
            "rotateX(-45deg) rotateY(45deg) rotateZ(-90deg)";
        } else if (random === 3) {
          smallDice.style.transform =
            "rotateX(-45deg) rotateY(45deg) rotateZ(90deg)";
        } else if (random === 4) {
          smallDice.style.transform = "rotateX(-45deg) rotateY(-45deg)";
        } else if (random === 5) {
          smallDice.style.transform = "rotateX(135deg) rotateY(-45deg)";
        } else if (random === 6) {
          smallDice.style.transform =
            "rotateX(45deg) rotateY(180deg) rotateZ(-45deg)";
        }

        // 隐藏骰子动画，显示小骰子
        dice.style.display = "none";
        smallDice.style.display = "block";

        // 人物移动动画
        let player = document.getElementById(this.currentPlayer);
        let step = this.players[this.currentPlayer].step;
        let end;
        if (step >= 0 && step < 11) {
          end = this.players[this.currentPlayer].position.x - 8.33;
        } else if (step >= 11 && step < 17) {
          end = this.players[this.currentPlayer].position.y - 14.285;
        } else if (step >= 17 && step < 28) {
          end = this.players[this.currentPlayer].position.x + 8.33;
        } else if ((step >= 28 && step <= 32) || step === 0) {
          end = this.players[this.currentPlayer].position.y + 14.285;
        }
        // 开始行走
        let timer = setInterval(() => {
          this.runStep(
            player,
            (this.players[this.currentPlayer].step + random) % 33,
            end,
            timer
          );
        }, 20);
      }, 1100);
    },

    // 走步
    runStep(player, endStep, end, timer) {
      let step = this.players[this.currentPlayer].step;

      // 到达目的地
      if (step === endStep) {
        window.clearInterval(timer);

        console.log(
          "type: ",
          this.country[this.players[this.currentPlayer].step].type
        );
        if (
          this.country[this.players[this.currentPlayer].step].type === "place"
        ) {
          // 提示是否够买
          this.dialogVisible = true;
        } else if (
          this.country[this.players[this.currentPlayer].step].type === "fate"
        ) {
          // 抽取命运
          let random =
            Math.floor(Math.random() * Object.keys(this.fates).length) + 1;
          if (random === Object.keys(this.fates).length + 1) {
            random = Object.keys(this.fates).length;
          }

          let fate = this.fates[random];
          console.log(fate);
        } else if (
          this.country[this.players[this.currentPlayer].step].type === "chance"
        ) {
          // 抽取机会
          let random =
            Math.floor(Math.random() * Object.keys(this.chances).length) + 1;
          if (random === Object.keys(this.chances).length + 1) {
            random = Object.keys(this.chances).length;
          }

          let chance = this.chances[random];
          console.log(chance);
        }
      }

      // 根据所在位置判断行走方向
      if (step >= 0 && step < 11) {
        this.players[this.currentPlayer].position.x -= 0.5;
        if (this.players[this.currentPlayer].position.x - end < 0.5) {
          player.style.left = end + "%";
          window.clearInterval(timer);
          this.players[this.currentPlayer].step += 1;
          end -= 8.33;
          timer = setInterval(() => {
            if (step === 10) {
              this.runStep(player, endStep, 85.815 - 14.285, timer);
            } else {
              this.runStep(player, endStep, end, timer);
            }
          }, 20);
        } else {
          player.style.left =
            this.players[this.currentPlayer].position.x - 0.5 + "%";
        }
      } else if (step >= 11 && step < 17) {
        this.players[this.currentPlayer].position.y -= 0.5;
        if (this.players[this.currentPlayer].position.y - end < 0.5) {
          player.style.top = end + "%";
          window.clearInterval(timer);
          this.players[this.currentPlayer].step += 1;
          end -= 14.285;
          timer = setInterval(() => {
            if (step === 16) {
              this.runStep(player, endStep, -0.65 + 8.33, timer);
            } else {
              this.runStep(player, endStep, end, timer);
            }
          }, 20);
        } else {
          player.style.top =
            this.players[this.currentPlayer].position.y - 0.5 + "%";
        }
      } else if (step >= 17 && step < 28) {
        this.players[this.currentPlayer].position.x += 0.5;
        if (end - this.players[this.currentPlayer].position.x < 0.5) {
          player.style.left = end + "%";
          window.clearInterval(timer);
          this.players[this.currentPlayer].step += 1;
          end += 8.33;
          timer = setInterval(() => {
            if (step === 27) {
              this.runStep(player, endStep, 0.03 + 14.285, timer);
            } else {
              this.runStep(player, endStep, end, timer);
            }
          }, 20);
        } else {
          player.style.left =
            this.players[this.currentPlayer].position.x + 0.5 + "%";
        }
      } else if (step >= 28 && step <= 33) {
        this.players[this.currentPlayer].position.y += 0.5;
        if (end - this.players[this.currentPlayer].position.y < 0.5) {
          player.style.top = end + "%";
          window.clearInterval(timer);
          if (step >= 33) {
            this.players[this.currentPlayer].step = 0;
          } else {
            this.players[this.currentPlayer].step += 1;
          }
          end += 14.285;
          timer = setInterval(() => {
            if (step === 33) {
              this.runStep(player, endStep, 91.67 - 8.33, timer);
            } else {
              this.runStep(player, endStep, end, timer);
            }
          }, 20);
        } else {
          player.style.top =
            this.players[this.currentPlayer].position.y + 0.5 + "%";
        }
      }
    }
  }
};
</script>

<style>
@import "../assets/css/dice.css";
#appself {
  text-align: center;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  background: url("../assets/grunge.png");
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}

#info {
  width: 15%;
  height: 100%;
  background-color: aqua;
}

#playerInfo {
  width: 100%;
  height: 35%;
  /* display: inline-block; */
  background-color: azure;
}

.user {
  width: 100%;
  padding: 5px;
}

.userColor {
  width: 15px;
  height: 15px;
  /* display: inline-block; */
  border-radius: 50%;
  /* float: left; */
  margin-left: 6%;
  background-color: red;
}

.userName {
  float: left;
}

.money {
  float: right;
}

#gameInfo {
  width: 100%;
  height: 65%;
  background-color: cadetblue;
}

#bg {
  background-color: #a09a6054;
  height: 80%;
  width: 80%;
  margin: auto;
  position: relative;
}

#top {
  /* background-color: saddlebrown; */
  height: 14.285%;
}

.row-room {
  width: 8.33%;
  height: 100%;
  float: left;
  /* background-color: blueviolet; */
  border: 1px solid #000;
  box-sizing: border-box;
}

#middle {
  /* background-color: blue; */
  height: 71.53%;
}

.col-room {
  height: 20%;
  width: 100%;
  border: 1px solid #000;
  box-sizing: border-box;
}

#middle-left {
  /* background-color: brown; */
  width: 8.33%;
  height: 100%;
  float: left;
}

#middle-middle {
  background-color: rgba(3, 170, 60, 0.64);
  width: 83.34%;
  height: 100%;
  float: left;
  position: relative;
}

#throw_dice {
  position: absolute;
  /* margin-top: 40%; */
  background-color: rgb(15, 90, 90);
  /* float: right; */
  right: 15%;
  bottom: 20%;
}

#middle-right {
  /* background-color: rgb(233, 53, 62); */
  height: 100%;
  width: 8.33%;
  float: right;
}

#bottom {
  /* background-color: rgb(7, 204, 194); */
  height: 14.285%;
  width: 100%;
  /* position: sticky; */
  /* float: inherit; */
  position: absolute;
  /* margin-top: 40%; */
  bottom: 0;
}

.playerImg {
  width: 20%;
}

.player {
  transition: transform 0.35s;
}
</style>
