<template>
  <div id="appself">
    <div id="gamePanel">
      <!-- 倒计时 -->
      <div id="countDown">
        <div id="countDownNum" v-show="countDown.visible">
          {{this.countDown.num}}
        </div>
      </div>
      <div id="bg">
        <div id="top">
          <div id="room-17" class="row-room" style="border-top-left-radius: 15px;"></div>
          <div id="room-18" class="row-room"></div>
          <div id="room-19" class="row-room"></div>
          <div id="room-20" class="row-room"></div>
          <div id="room-21" class="row-room"></div>
          <div id="room-22" class="row-room"></div>
          <div id="room-23" class="row-room"></div>
          <div id="room-24" class="row-room"></div>
          <div id="room-25" class="row-room"></div>
          <div id="room-26" class="row-room"></div>
          <div id="room-27" class="row-room"></div>
          <div id="room-28" class="row-room" style="border-top-right-radius: 15px;"></div>
          <!-- <div class="row-room" style="color:blue">监狱</div> -->
        </div>

        <div id="middle">
          <div id="middle-left">
            <div id="room-16" class="col-room"></div>
            <div id="room-15" class="col-room"></div>
            <div id="room-14" class="col-room"></div>
            <div id="room-13" class="col-room"></div>
            <div id="room-12" class="col-room"></div>
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
            <div id="throw_dice" v-if="roomInfo.roomStatus === '游戏中'">
              <button @click="getCurrentAreas()">出售</button>
              <button @click="throwDice()" :disabled="diceButton">掷骰子</button>
            </div>
            <div id="throw_dice" v-else-if="roomInfo.roomStatus === '等待' && roomInfo.owner === currentPlayer">
              <button @click="startGame()">开始</button>
            </div>
            <div id="throw_dice" v-else-if="roomInfo.roomStatus === '等待' && roomInfo.owner !== currentPlayer">
              请等待房主开始游戏
            </div>
          </div>
          <div id="middle-right">
            <div id="room-29" class="col-room"></div>
            <div id="room-30" class="col-room"></div>
            <div id="room-31" class="col-room"></div>
            <div id="room-32" class="col-room"></div>
            <div id="room-33" class="col-room"></div>
          </div>
        </div>

        <div id="bottom">
          <!-- <div class="row-room" style="color:blue">监狱</div> -->
          <div id="room-11" class="row-room" style="border-bottom-left-radius: 15px;"></div>
          <div id="room-10" class="row-room"></div>
          <div id="room-9" class="row-room"></div>
          <div id="room-8" class="row-room"></div>
          <div id="room-7" class="row-room"></div>
          <div id="room-6" class="row-room"></div>
          <div id="room-5" class="row-room"></div>
          <div id="room-4" class="row-room"></div>
          <div id="room-3" class="row-room"></div>
          <div id="room-2" class="row-room"></div>
          <div id="room-1" class="row-room"></div>
          <div id="room-0" class="row-room" style="border-bottom-right-radius: 15px;"></div>
        </div>
      </div>
    </div>
    
    <div id="info">
      <div id="playerInfoBorder">
        <div id="playerInfo" >
          <table class="user">
            <tr>
              <th class="user-title"></th>
              <th class="user-title">颜色</th>
              <th class="user-title">昵称</th>
              <th class="user-title">金钱</th>
            </tr>
            <tr v-for="(player, id) in players" :key="player._id">
              <td><div v-if="id === currentRound" class="userColor" :style="'background-color:'+player.color"></div></td>
              <td><div class="userColor" :style="'background-color:'+player.color"></div></td>
              <td>{{player.username}}</td>
              <td>{{player.money}}</td>
            </tr>
          </table>
        </div> 
      </div>
      <div id="gameInfoBorder">
        <div id="gameInfo">
          <div id="console-wrapper"></div>
        </div>
      </div>
    </div>
    <!-- 够买升级 -->
    <el-dialog
      :title="buyDialog.title"
      :visible.sync="buyDialog.dialogVisible"
      width="30%">
      <span>{{buyDialog.dialogText}}</span>
      <br>
      <span>{{buyDialog.price}}</span>
      <span slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button @click="buy(false)">取 消</el-button>
        <el-button type="primary" @click="buy(true)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 出售 -->
    <el-dialog
      :title="saleDialog.title"
      :visible.sync="saleDialog.visible">
      <div v-show="saleDialog.moneyTextVisible">{{saleDialog.moneyText}}</div>
      <el-table :data="saleDialog.areas" max-height="400">
        <el-table-column property="country" label="地区"></el-table-column>
        <el-table-column property="rank" label="房屋数"></el-table-column>
        <el-table-column property="price" label="地皮所得"></el-table-column>
        <el-table-column property="upgradePrice" label="房屋单价"></el-table-column>
        <el-table-column property="total" label="总价"></el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="saleHouse(scope.$index, scope.row)">出售一级</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 机会、命运提示 -->
    <el-dialog
      :title="tipDialog.title"
      :visible.sync="tipDialog.dialogVisible"
      width="30%">
      <span>{{tipDialog.dialogText}}</span>
    </el-dialog>
  </div>
</template>

<script src="../assets/js/socket.io.js"></script>

<script>
import user from "@/api/user";
import game from "@/api/game";
import { Message } from "element-ui";

export default {
  name: "App",
  data() {
    return {
      roomId: "", // 房间id
      diceButton: false, // 骰子按钮可用状态
      playerNum: 1, // 玩家实际数量
      myname: "",
      currentPlayer: "", // 当前用户id
      currentRound: "", // 当前轮到的玩家id
      currentStatus: "dice", // 等待掷骰子(dice)、等待玩家操作(oper)
      roomInfo: {
        roomStatus: "等待中",
        owner: ""
      },
      players: {}, // 房间内玩家信息
      diceMsg: {}, // 扔骰子返回的信息存储到diceMsg，走完步后使用
      buyDialog: {
        title: "提示",
        dialogVisible: false,
        dialogText: "是否够买",
        price: 0
      },
      saleDialog: {
        title: "出售房屋",
        visible: false,
        areas: [],
        moneyText: "需支付1000元",
        moneyTextVisible: false
      },
      tipDialog: {
        title: "机会",
        dialogVisible: false,
        dialogText: ""
      },
      // 倒计时
      countDown: {
        num: 0,
        visible: false
      },
      // 土地信息
      area: {}
    };
  },
  created() {},
  mounted() {
    this.roomId = this.$route.query.roomId;
    this.getCurrentPlayer();

    // 订阅websocket消息
    this.socketMessage();
  },
  methods: {
    socketMessage() {
      // 接受广播的骰子消息
      this.sockets.subscribe(this.roomId + "-throwDiceBack", msg => {
        this.diceMsg = msg;
        this.currentRound = msg.nextPlayer;

        if (
          msg.result === "run" ||
          msg.result === "buy" ||
          msg.result === "upgrade" ||
          msg.result === "pay" ||
          msg.result === "nothingToPay"
        ) {
          this.players[msg._id].area = msg.area;
          this.run(msg._id, msg.step);
        } else if (msg.result === "noRound") {
          if (msg._id === this.currentPlayer) {
            Message({
              message: "还没到你",
              type: "warning",
              duration: 5 * 1000
            });
            this.print("还没到你");
          }
        } else if (msg.result === "needSaleHouse") {
          this.players[msg._id].area = msg.area;
          this.run(msg._id, msg.step);
        }

        if (msg.throughStart) {
          this.players[msg._id].price += 2000;
        }
      });

      // 接受广播的够买地区消息
      this.sockets.subscribe(this.roomId + "-buyAreaBack", msg => {
        let area = document.getElementById(
          "room-" + this.players[msg._id].step
        );

        if (msg.result === "buy") {
          this.players[msg._id].money = msg.money;
          this.print(
            this.players[msg._id].username + " 够买了 " + msg.area.country
          );

          area.style.backgroundColor = this.players[msg._id].color;
          let houseImg = document.createElement("img");
          houseImg.src = "/static/img/house.png";
          houseImg.style.width = "20%";
          area.innerHTML =
            msg.area.country + "<br>$" + msg.area.price + "<br>" + 0 + " X ";
          area.appendChild(houseImg);

        } else if (msg.result === "upgrade") {
          this.players[msg._id].money = msg.money;
          this.print(
            this.players[msg._id].username + " 升级了 " + msg.area.country
          );
          let houseImg = document.createElement("img");
          houseImg.src = "/static/img/house.png";
          houseImg.style.width = "20%";
          area.innerHTML =
            msg.area.country +
            "<br>$" +
            msg.area.price +
            "<br>" +
            (Number(msg.area.rank) - 1) +
            " X ";
          area.appendChild(houseImg);

        } else if (msg.result === "noMoney") {
          Message({
            message: "金钱不足",
            type: "warning",
            duration: 5 * 1000
          });
          this.print("金钱不足，无法够买" + msg.area.country);
        } else if (msg.result === "isBought") {
          Message({
            message: "已被人够买，不能再买",
            type: "warning",
            duration: 5 * 1000
          });
        } else if (msg.result === "noRound") {
          Message({
            message: "还没到你",
            type: "warning",
            duration: 5 * 1000
          });
          this.print("还没到你");
        }
        this.currentRound = msg.nextPlayer;
        // 轮到当前用户时投掷按钮可用
        if (this.currentPlayer === msg.nextPlayer) {
          this.diceButton = false;
        }

        this.countDown.visible = false;
        this.buyDialog.dialogVisible = false;
      });

      // 接受破产消息
      this.sockets.subscribe(this.roomId + "-bankrupt", msg => {
        Message({
          message: this.players[msg._id].username + " 破产了",
          type: "warning",
          duration: 5 * 1000
        });
        this.print(this.players[msg._id].username + " 破产了");
      });

      // 游戏开始消息
      this.sockets.subscribe(this.roomId + "-startGameBack", msg => {
        if (msg.type === "start") {
          Message({
            message: "游戏开始",
            type: "message",
            duration: 5 * 1000
          });
          this.roomInfo.roomStatus = "游戏中";
          this.print("游戏开始");
        }
      });

      // 加入游戏消息
      this.sockets.subscribe(this.roomId + "-joinRoomBack", msg => {
        if (msg.type === "join") {
          this.getRoomUsers();
        }
        Message({
          message:
            msg.user.username +
            (msg.type === "join" ? " 加入游戏" : " 返回游戏"),
          type: "message",
          duration: 5 * 1000
        });
        this.print(
          msg.user.username + (msg.type === "join" ? " 加入游戏" : " 返回游戏")
        );
      });

      // 倒计时
      this.sockets.subscribe(this.roomId + "-countDown", msg => {
        this.countDown.num = msg.countDown;
        this.countDown.visible = true;

        if (msg.countDown == 0) {
          this.countDown.visible = false;
          this.buyDialog.dialogVisible = false;
        }
      });

      // 切换当前玩家
      this.sockets.subscribe(this.roomId + "-currentRound", msg => {
        this.currentRound = msg.nextPlayer;
        // 轮到当前用户时投掷按钮可用
        if (this.currentPlayer === msg.nextPlayer) {
          this.diceButton = false;
        }
      });

      // 出售房屋
      this.sockets.subscribe(this.roomId + "-saleHouseBack", msg => {
        if (msg.result == "place" || msg.result == "house") {
          Message({
            message:
              msg.username +
              " 出售了 " +
              msg.area.country +
              (msg.result == "place" ? "" : "的一间房子"),
            type: "message",
            duration: 5 * 1000
          });
          this.print(
            msg.username +
              " 出售了 " +
              msg.area.country +
              (msg.result == "place" ? "" : "的一间房子")
          );
          this.players[msg._id].money = msg.money;

          let area = document.getElementById("room-" + msg.area.id);
          if (msg.result == "place") {
            area.innerHTML = msg.area.country + "<br>$" + msg.area.price;
            area.style.backgroundColor = "initial";
            for (let i in this.saleDialog.areas) {
              if (this.saleDialog.areas[i].id === msg.area.id) {
                this.saleDialog.areas.splice(i, 1);
              }
            }
          } else {
            area.innerHTML =
              msg.area.country +
              "<br>$" +
              msg.area.price +
              "<br>" +
              (Number(msg.area.rank) - 1) +
              " X ";

            let houseImg = document.createElement("img");
            houseImg.src = "/static/img/house.png";
            houseImg.style.width = "20%";
            area.appendChild(houseImg);

            for (let i in this.saleDialog.areas) {
              if (this.saleDialog.areas[i].id === msg.area.id) {
                this.saleDialog.areas[i].rank = Number(msg.area.rank) - 1;
              }
            }
          }
        } else if (msg.result == "noOwner" && msg._id === this.currentPlayer) {
          Message({
            message: "这不是你的房子，不能出售",
            type: "error",
            duration: 5 * 1000
          });
          this.print("这不是你的房子，不能出售");
        }
      });

      // 现金不足，需卖房
      this.sockets.subscribe(this.roomId + "-needSaleHouseBack", msg => {
        this.saleDialog.visible = false;
        this.saleDialog.moneyTextVisible = false;
        this.players[msg._id].money = msg.payPlayerMoney;
        if (msg.payFor && msg.payFor != "") {
          this.players[msg.payFor].money = msg.getPlayerMoney;
        }
        let text = "";
        if (msg.result === "moneyEnough") {
          text = "扣款 " + msg.effect + "元 成功";
        } else {
          for (let i in msg.sale) {
            let area = document.getElementById("room-" + msg.sale[i].id);
            if (msg.sale[i].rank < 1) {
              area.innerHTML =
                msg.sale[i].country + "<br>$" + msg.sale[i].price;
              area.style.backgroundColor = "initial";
            } else {
              area.innerHTML =
                msg.sale[i].country +
                "<br>$" +
                msg.sale[i].price +
                "<br>" +
                (Number(msg.sale[i].rank) - 1) +
                " X ";

              let houseImg = document.createElement("img");
              houseImg.src = "/static/img/house.png";
              houseImg.style.width = "20%";
              area.appendChild(houseImg);
            }
          }

          text = "现金依然不足，已自动售出 ";
          for (let i in msg.sale) {
            text += msg.sale[i].country + ",";
          }

          text =
            text.substr(0, text.length - 1) +
            "的房屋或土地支付 " +
            msg.effect +
            "元";
        }

        Message({
          message: text,
          type: "message",
          duration: 5 * 1000
        });
        this.print(text);
      });

      // 游戏结束
      this.sockets.subscribe(this.roomId + "-gameOver", msg => {
        Message({
          message: "游戏结束",
          type: "message",
          duration: 3 * 1000
        });
        this.print("游戏结束");

        // 退回游戏大厅
        setTimeout(() => {
          this.$router.push({
            path: "/result",
            query: { roomId: this.roomId }
          });
        }, 3);
      });
    },
    getCurrentPlayer() {
      user
        .current()
        .then(res => {
          if (res.errno === 1000) {
            this.currentPlayer = res.data._id;
            this.myname = res.data.username;
            this.getRoomUsers();
          }
        })
        .catch(e => {
          console.log("error: ", e);
        });
    },
    getRoomUsers() {
      game
        .getRoom(this.roomId)
        .then(res => {
          if (res.errno === 1000) {
            this.players = JSON.parse(res.data.players);
            this.setMap(JSON.parse(res.data.area));
            this.roomInfo.roomStatus = res.data.status;
            this.roomInfo.owner = res.data.owner;
            this.playerIds = res.data.playerIds.split(",");
            this.currentRound = res.data.playerIds.split(",")[
              res.data.currentRound
            ];

            // 轮到当前用户时投掷按钮可用
            if (this.currentPlayer === this.currentRound) {
              this.diceButton = false;
            }

            console.log("players: ", res.data);

            for (let pl in this.players) {
              // 创建玩家
              let player = document.createElement("div");
              player.id = pl;
              player.className = "player";
              let name = document.createElement("div");
              name.style.height = "25px";
              player.appendChild(name);
              let img = document.createElement("img");
              img.src = "/static/img/player.png";
              img.className = "playerImg";
              img.alt = "玩家";
              img.style["background-color"] = this.players[pl].color;
              player.appendChild(img);
              player.style.width = "8.33%";
              player.style.height = "15%";
              player.style.position = "absolute";
              player.style.left = this.players[pl].area.position.x + "%";
              player.style.top = this.players[pl].area.position.y + "%";
              this.players[pl].position = this.players[pl].area.position;
              player.style.zIndex = 9999;
              document
                .getElementById("bg")
                .insertBefore(player, document.getElementById("top"));
            }
          } else if (res.errno === 1048) {
            Message({
              message: res.errmsg,
              type: "error",
              duration: 5 * 1000
            });
            this.$router.push({ path: "/hall" });
          }
        })
        .catch(e => {
          console.log("error: ", e);
        });
    },
    setMap(area) {
      this.area = area;
      let keys = Object.keys(area);
      for (let i of keys) {
        let room = document.getElementById("room-" + i);
        room.innerHTML =
          area[i].country +
          (area[i].type === "place" ? "<br>$" + area[i].price : "");
        if (area[i].type === "chance") {
          room.style.color = "red";
        } else if (area[i].type === "fate") {
          room.style.color = "yellow";
        }

        if (area[i].rank > 0) {
          room.innerHTML += "<br>" + (area[i].rank - 1) + " X ";
          let houseImg = document.createElement("img");
          houseImg.src = "/static/img/house.png";
          houseImg.style.width = "20%";
          room.appendChild(houseImg);
        }

        let playerKeys = Object.keys(this.players);
        for (let playerId of playerKeys) {
          if (playerId === area[i].owner) {
            let ar = document.getElementById("room-" + i);
            ar.style.backgroundColor = this.players[playerId].color;
          }
        }
      }
    },
    startGame() {
      game
        .startGame(this.roomId)
        .then(res => {
          console.log("fanhui: ", res);
          if (res.errno === 1000) {
          } else if (res.errno === 1050) {
            Message({
              message: "游戏已经开始",
              type: "error",
              duration: 5 * 1000
            });
          } else if (res.errno === 1026) {
            Message({
              message: res.data,
              type: "error",
              duration: 5 * 1000
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    throwDice() {
      this.$socket.emit("throwDice", {
        token: localStorage.richman_token,
        roomId: this.roomId
      });
      this.diceButton = true;
    },
    run(userId, random) {

      let dice = document.getElementById("big-dice");
      let smallDice = document.getElementById("group2");

      // 隐藏小骰子，显示骰子动画
      smallDice.style.display = "none";
      dice.style.display = "block";

      setTimeout(() => {

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
        let player = document.getElementById(userId);
        let step = this.players[userId].step;
        let end;
        if (step >= 0 && step < 11) {
          end = this.players[userId].position.x - 8.33;
        } else if (step >= 11 && step < 17) {
          end = this.players[userId].position.y - 14.285;
        } else if (step >= 17 && step < 28) {
          end = this.players[userId].position.x + 8.33;
        } else if (step >= 28 && step < 34) {
          end = this.players[userId].position.y + 14.285;
        }
        // 开始行走
        let timer = setInterval(() => {
          this.runStep(
            player,
            (this.players[userId].step + random) % 34,
            end,
            timer,
            userId,
            "dice"
          );
        }, 20);
      }, 1100);
    },

    // 走步
    runStep(player, endStep, end, timer, userId, type) {
      let step = this.players[userId].step;

      // 到达目的地
      if (step === endStep) {
        window.clearInterval(timer);

        if (type === "dice") {
          // 轮到当前用户时投掷按钮可用
          if (
            (this.diceMsg.result === "run" || this.diceMsg.result === "pay") &&
            this.currentPlayer === this.diceMsg.nextPlayer
          ) {
            this.diceButton = false;
          }

          if (
            this.diceMsg.result === "buy" ||
            this.diceMsg.result === "upgrade" ||
            this.diceMsg.result === "pay" ||
            this.diceMsg.result === "run"
          ) {
            if (userId === this.currentPlayer) {
              if (this.diceMsg.area.type === "place") {
                // 提示是否够买
                if (this.diceMsg.result === "buy") {
                  this.buyDialog.dialogText =
                    "是否够买" + this.diceMsg.area.country;
                  this.buyDialog.price = "价格：" + this.diceMsg.area.price;
                  this.buyDialog.dialogVisible = true;
                } else if (this.diceMsg.result === "upgrade") {
                  this.buyDialog.dialogText =
                    "是否升级" + this.diceMsg.area.country;
                  this.buyDialog.price =
                    "价格：" + this.diceMsg.area.upgradePrice;
                  this.buyDialog.dialogVisible = true;
                }
              }
            }

            if (this.diceMsg.area.type === "place") {
              if (this.diceMsg.result === "pay") {
                this.players[
                  this.diceMsg._id
                ].money -= this.diceMsg.area.income[this.diceMsg.area.rank];
                this.players[
                  this.diceMsg.payFor
                ].money += this.diceMsg.area.income[this.diceMsg.area.rank];
                let text =
                  this.players[this.diceMsg._id].username +
                  " 付给 " +
                  this.players[this.diceMsg.payFor].username +
                  " " +
                  this.diceMsg.area.income[this.diceMsg.area.rank];
                Message({
                  message: text,
                  type: "message",
                  duration: 5 * 1000
                });

                this.prin(text);
              }
            } else if (
              this.diceMsg.area.type === "chance" ||
              this.diceMsg.area.type === "fate" ||
              this.diceMsg.area.type === "prison"
            ) {
              // 机会或命运
              this.tipDialog.title = this.diceMsg.effect.text;
              this.tipDialog.dialogText = this.diceMsg.effect.result;
              this.tipDialog.dialogVisible = true;
              this.players[this.diceMsg._id].money += Number(
                this.diceMsg.effect.effect
              );
              this.prin(
                this.players[this.diceMsg._id].username +
                  "抽到: " +
                  this.diceMsg.effect.text
              );

              setTimeout(() => {
                this.tipDialog.dialogVisible = false;
              }, 3000);
            }
          } else if (this.diceMsg.result === "needSaleHouse") {
            let money = 0;
            if (this.diceMsg._id === this.currentPlayer) {
              if (this.diceMsg.area.type === "place") {
                money = this.diceMsg.area.income[this.diceMsg.area.rank];
              } else {
                money = 0 - this.diceMsg.effect.effect;
              }
              this.saleDialog.moneyText = "需支付 " + money + "元";
              this.saleDialog.moneyTextVisible = true;
              this.getCurrentAreas();
            }
            let text =
              "现金不足，请" +
              this.players[this.diceMsg._id].username +
              "在倒计时内卖出足够的房产向" +
              this.players[this.diceMsg.payFor] +
              "支付 " +
              money +
              " 元";
            Message({
              message: text,
              type: "error",
              duration: 5 * 1000
            });
            this.prin(text);
          } else if (this.diceMsg.result === "nothingToPay") {
            Message({
              message:
                this.players[this.diceMsg.result._id].username + " 破产了",
              type: "warning",
              duration: 5 * 1000
            });
            this.prin(
              this.players[this.diceMsg.result._id].username + " 破产了"
            );
          }

          if (this.diceMsg.throughStart) {
            this.players[this.diceMsg._id].money += 2000;
          }
        }
      }

      // 根据所在位置判断行走方向
      if (step >= 0 && step < 11) {
        // 移动一点
        this.players[userId].position.x -= 0.5;
        if (this.players[userId].position.x - end < 0.5) {
          // 走完一格
          player.style.left = end + "%";
          window.clearInterval(timer);
          this.players[userId].step += 1;
          end -= 8.33;
          timer = setInterval(() => {
            if (step === 10) {
              this.runStep(
                player,
                endStep,
                85.815 - 14.285,
                timer,
                userId,
                type
              );
            } else {
              this.runStep(player, endStep, end, timer, userId, type);
            }
          }, 20);
        } else {
          player.style.left = this.players[userId].position.x - 0.5 + "%";
        }
      } else if (step >= 11 && step < 17) {
        this.players[userId].position.y -= 0.5;
        if (this.players[userId].position.y - end < 0.5) {
          player.style.top = end + "%";
          window.clearInterval(timer);
          this.players[userId].step += 1;
          end -= 14.285;
          timer = setInterval(() => {
            if (step === 16) {
              this.runStep(player, endStep, -0.65 + 8.33, timer, userId, type);
            } else {
              this.runStep(player, endStep, end, timer, userId, type);
            }
          }, 20);
        } else {
          player.style.top = this.players[userId].position.y - 0.5 + "%";
        }
      } else if (step >= 17 && step < 28) {
        this.players[userId].position.x += 0.5;
        if (end - this.players[userId].position.x < 0.5) {
          player.style.left = end + "%";
          window.clearInterval(timer);
          this.players[userId].step += 1;
          end += 8.33;
          timer = setInterval(() => {
            if (step === 27) {
              this.runStep(player, endStep, 0.03 + 14.285, timer, userId, type);
            } else {
              this.runStep(player, endStep, end, timer, userId, type);
            }
          }, 20);
        } else {
          player.style.left = this.players[userId].position.x + 0.5 + "%";
        }
      } else if (step >= 28 && step < 34) {
        this.players[userId].position.y += 0.5;
        if (end - this.players[userId].position.y < 0.5) {
          player.style.top = end + "%";
          window.clearInterval(timer);
          if (step >= 33) {
            this.players[userId].step = 0;
          } else {
            this.players[userId].step += 1;
          }

          end += 14.285;
          timer = setInterval(() => {
            if (step === 33) {
              this.runStep(player, endStep, 91.67 - 8.33, timer, userId, type);
            } else {
              this.runStep(player, endStep, end, timer, userId, type);
            }
          }, 20);
        } else {
          player.style.top = this.players[userId].position.y + 0.5 + "%";
        }
      }
    },
    buy(isBuy) {
      this.$socket.emit("buyArea", {
        token: localStorage.richman_token,
        roomId: this.roomId,
        orderId: this.diceMsg.orderId,
        isBuy: isBuy
      });
    },
    getCurrentAreas() {
      this.saleDialog.visible = true;
      game
        .getCurrentAreas(this.roomId)
        .then(res => {
          if (res.errno === 1000) {
            this.saleDialog.areas = res.data;
          } else if (res.errno === 1048) {
            Message({
              message: res.errmsg,
              type: "error",
              duration: 5 * 1000
            });
            this.$router.push({ path: "/hall" });
          }
        })
        .catch(e => {
          console.log("error: ", e);
        });
    },
    saleHouse(index, row) {
      this.saleDialog.visible = true;
      this.$socket.emit("saleHouse", {
        token: localStorage.richman_token,
        roomId: this.roomId,
        id: row.id
      });
    },
    print(msg) {
      const con = document.getElementById("console-wrapper");
      let time = new Date();
      con.innerText +=
        "[系统] " +
        time.getHours() +
        ":" +
        time.getMinutes() +
        ":" +
        time.getSeconds() +
        " " +
        msg +
        "\n";
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
  display: flex;
}

#gamePanel {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

#countDown {
  width: 50px;
  height: 30px;
  margin-top: 30px;
  border-radius: 15%;
}

#countDownNum {
  width: 100%;
  height: 100%;
  background-color: #dbd6cfa1;
}

#info {
  width: 20%;
  height: 100%;
}

#playerInfo {
  width: 100%;
  height: 100%;
  background-color: #f9fff0;
  border-radius: 10px;
}

#playerInfoBorder {
  width: 100%;
  height: 35%;
  padding: 3%;
  box-sizing:border-box;
  background-color: #b9835875;
}

#console-wrapper {
  padding: 12px;
  border-radius: 10px;
  width: 100%;
  height: 90%;
  background: #eee;
  box-sizing:border-box;
  font-size: 14px;
  text-align: left;
}

#console {
  width: 100%;
  height: 100%;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.user {
  width: 100%;
  padding: 5px;
}

.user-title {
  font-size: 14px;
}

.userColor {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-left: 6%;
  background-color: black;
}

#gameInfo {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

#gameInfoBorder {
  width: 100%;
  height: 65%;
  padding: 3%;
  box-sizing:border-box;
  background-color: cadetblue;
}

#bg {
  background-color: #a09a6054;
  height: 80%;
  width: 80%;
  margin: auto;
  position: relative;
  border-radius: 15px;
}

#top {
  height: 14.285%;
}

.row-room {
  width: 8.33%;
  height: 100%;
  float: left;
  border: 1px solid #000;
  box-sizing: border-box;
}

#middle {
  height: 71.53%;
}

.col-room {
  height: 20%;
  width: 100%;
  border: 1px solid #000;
  box-sizing: border-box;
}

#middle-left {
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
  background-color: rgb(15, 90, 90);
  right: 15%;
  bottom: 20%;
}

#middle-right {
  height: 100%;
  width: 8.33%;
  float: right;
}

#bottom {
  height: 14.285%;
  width: 100%;
  position: absolute;
  bottom: 0;
}

.playerImg {
  width: 20%;
}

.player {
  transition: transform 0.35s;
}
</style>
