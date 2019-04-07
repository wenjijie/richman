<template>
  <div id="appself">
    <div id="gamePanel">
      <!-- <div>我：{{myname}}</div> -->
      <!-- 倒计时 -->
      <div id="countDown">
        <div id="countDownNum" v-show="countDown.visible">
          {{this.countDown.num}}
        </div>
      </div>
      <div id="bg">
        <div id="top">
          <div id="room-17" class="row-room"></div>
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
          <div id="room-28" class="row-room"></div>
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
          <div id="room-11" class="row-room"></div>
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
          <div id="room-0" class="row-room"></div>
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
          <tr>
            <td class="user-title"></td>
            <td class="user-title">颜色</td>
            <td class="user-title">昵称</td>
            <td class="user-title">金钱</td>
          </tr>
          <tr v-for="(player, id) in players" :key="player._id">
            <th><div v-if="id === currentRound" class="userColor" :style="'background-color:'+player.color"></div></th>
            <th><div class="userColor" :style="'background-color:'+player.color"></div></th>
            <th class="userName">{{player.username}}</th>
            <th class="money">{{player.money}}</th>
          </tr>
        </table>
        <!-- <el-table :data="players">
          <el-table-column label="颜色" align="center" prop="apiname"/>
          <el-table-column label="名称" align="center" prop="username"/>
          <el-table-column label="金钱" align="center" prop="money"/>
        </el-table> -->
      </div> 
      <div id="gameInfo">
        <pre id="console" style="margin: 0"></pre>
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
      <!-- <el-table :data="saleDialog.areas" height="(document.getElementById('gamePanel')).offsetHeight)"> -->
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
      // socket: "",
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
        console.log("骰子消息： ", msg);
        this.diceMsg = msg;
        this.currentRound = msg.nextPlayer;

        // 轮到当前用户时投掷按钮可用
        // if (
        //   msg.result != "buy" &&
        //   msg.result != "upgrade" &&
        //   this.currentPlayer === msg.nextPlayer
        // ) {
        //   if (this.currentPlayer === msg.nextPlayer) {
        //     this.diceButton = false;
        //   }
        // }
        if (
          msg.result === "run" ||
          msg.result === "buy" ||
          msg.result === "upgrade" ||
          msg.result === "pay"
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
        console.log("够买消息： ", msg);
        let area = document.getElementById(
          "room-" + this.players[msg._id].step
        );

        console.log("area1: ", area);
        if (msg.result === "buy") {
          this.players[msg._id].money = msg.money;

          area.style.backgroundColor = this.players[msg._id].color;
          let houseImg = document.createElement("img");
          houseImg.src = "/static/img/house.png";
          houseImg.style.width = "20%";
          area.innerHTML =
            msg.area.country + "<br>$" + msg.area.price + "<br>" + 0 + " X ";
          console.log(houseImg);
          area.appendChild(houseImg);

          // Message({
          //   message:
          //     this.players[msg._id].username + " 够买了 " + msg.area.country,
          //   type: "message",
          //   duration: 5 * 1000
          // });
        } else if (msg.result === "upgrade") {
          this.players[msg._id].money = msg.money;
          // let room = document.getElementById("room-" + i);
          let houseImg = document.createElement("img");
          houseImg.src = "/static/img/house.png";
          houseImg.style.width = "20%";
          console.log("area: ", area);
          area.innerHTML =
            msg.area.country +
            "<br>$" +
            msg.area.price +
            "<br>" +
            (Number(msg.area.rank) - 1) +
            " X ";
          console.log(houseImg);
          area.appendChild(houseImg);

          // Message({
          //   message: "升级成功",
          //   type: "message",
          //   duration: 5 * 1000
          // });
        } else if (msg.result === "noMoney") {
          Message({
            message: "金钱不足",
            type: "warning",
            duration: 5 * 1000
          });
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
        }
        this.currentRound = msg.nextPlayer;
        // 轮到当前用户时投掷按钮可用
        if (this.currentPlayer === msg.nextPlayer) {
          this.diceButton = false;
        }

        // this.players[this.currentPlayer].money -= this.country[
        //   this.players[this.currentPlayer].step
        // ].price;
        this.countDown.visible = false;
        this.buyDialog.dialogVisible = false;
        // this.run(msg._id, msg.step);
      });

      // 接受破产消息
      this.sockets.subscribe(this.roomId + "-bankrupt", msg => {
        console.log("破产： ", msg);
        Message({
          message: this.players[msg._id].username + " 破产了",
          type: "warning",
          duration: 5 * 1000
        });
      });

      // 游戏开始消息
      this.sockets.subscribe(this.roomId + "-startGameBack", msg => {
        console.log("游戏开始： ", msg);
        if (msg.type === "start") {
          Message({
            message: "游戏开始",
            type: "message",
            duration: 5 * 1000
          });
          this.roomInfo.roomStatus = "游戏中";
          // this.getRoomUsers();
        }
      });

      // 加入游戏消息
      this.sockets.subscribe(this.roomId + "-joinRoomBack", msg => {
        console.log("加入游戏： ", msg);
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
      });

      // 倒计时
      this.sockets.subscribe(this.roomId + "-countDown", msg => {
        console.log("倒计时： ", msg);
        this.countDown.num = msg.countDown;
        this.countDown.visible = true;

        if (msg.countDown == 0) {
          this.countDown.visible = false;
          this.buyDialog.dialogVisible = false;
        }
      });

      // 切换当前玩家
      this.sockets.subscribe(this.roomId + "-currentRound", msg => {
        console.log("切换玩家： ", msg);
        this.currentRound = msg.nextPlayer;
        // 轮到当前用户时投掷按钮可用
        if (this.currentPlayer === msg.nextPlayer) {
          this.diceButton = false;
        }
      });

      // 出售房屋
      this.sockets.subscribe(this.roomId + "-saleHouseBack", msg => {
        console.log("出售房屋： ", msg);
        console.log("ss: ", this.saleDialog.areas);
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
          console.log("asdfsdf: ", this.players[msg._id]);
          this.players[msg._id].money = msg.money;

          let area = document.getElementById("room-" + msg.area.id);
          // let area = document.getElementById("room-" + msg.houseId);
          if (msg.result == "place") {
            area.innerHTML = msg.area.country + "<br>$" + msg.area.price;
            area.style.backgroundColor = "initial";
            console.log("aa:", this.saleDialog.areas);
            for (let i in this.saleDialog.areas) {
              console.log(
                "this.saleDialog.areas.id",
                this.saleDialog.areas[i].id
              );
              console.log("houseId: ", msg.area.id);
              // console.log("houseId: ", msg.area.id);
              if (this.saleDialog.areas[i].id === msg.area.id) {
              // if (this.saleDialog.areas[i].id === msg.area.id) {
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
              // if (this.saleDialog.areas[i].id === msg.houseId) {
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
        }
      });

      // 现金不足，需卖房
      this.sockets.subscribe(this.roomId + "-needSaleHouseBack", msg => {
        console.log("现金不足卖房： ", msg);
        // this.currentRound = msg.nextPlayer;
        this.saleDialog.visible = false;
        this.saleDialog.moneyTextVisible = false;
        this.players[msg._id].money = msg.payPlayerMoney;
        if (msg.payFor && msg.payFor != "") {
          console.log("ss: ", msg.getPlayerMoney);
          this.players[msg.payFor].money = msg.getPlayerMoney;
        }
        let text = "";
        if (msg.result === "moneyEnough") {
          text = "扣款 " + msg.effect + "元 成功";
        } else {
          for (let i in msg.sale) {
            let area = document.getElementById("room-" + msg.sale[i].id);
            // let area = document.getElementById("room-" + msg.sale[i].houseId);
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
      });

      // 游戏结束
      this.sockets.subscribe(this.roomId + "-gameOver", msg => {
        console.log("游戏结束： ", msg);
        Message({
          message: "游戏结束",
          type: "message",
          duration: 7 * 1000
        });

        // 退回游戏大厅
        setTimeout(() => {
          this.$router.push({ path: "/hall" });
        }, 7000);
      });
    },
    getCurrentPlayer() {
      user
        .current()
        .then(res => {
          if (res.errno === 1000) {
            // console.log('cuu res: ', res)
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
            console.log("ressss: ", res);
            this.players = JSON.parse(res.data.players);
            console.log("ppppppppppppp: ", this.players);
            this.setMap(JSON.parse(res.data.area));
            // this.area = JSON.parse(res.data.area);
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

            // this.players[this.currentPlayer].step = 0;
            console.log("players: ", res.data);

            for (let pl in this.players) {
              // this.players[pl].step = 0;

              // this.run(pl, this.players[pl].step);
              // console.log("key  : ", pl);
              // 创建玩家
              let player = document.createElement("div");
              player.id = pl;
              // player.id = this.currentPlayer;
              player.className = "player";
              // console.log("pl: ", pl);
              let name = document.createElement("div");
              // name.textContent = "玩家一";
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
              player.style.left = this.players[pl].area.position.x+"%";
              player.style.top = this.players[pl].area.position.y+"%";
              this.players[pl].position = this.players[pl].area.position;
              // player.style.left = "91.67%";
              // player.style.top = "85.815%";
              player.style.zIndex = 9999;
              document
                .getElementById("bg")
                .insertBefore(player, document.getElementById("top"));

              // // 人物移动动画
              // let end = this.players[pl].position.x - 8.33;
              // // 开始行走
              // let timer = setInterval(() => {
              //   this.runStep(
              //     player,
              //     JSON.parse(res.data.players)[pl].step,
              //     end,
              //     timer,
              //     pl,
              //     "init"
              //   );
              // }, 20);
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
      // console.log("areas: ", area);
      this.area = area;
      let keys = Object.keys(area);
      for (let i of keys) {
        // console.log(i);
        let room = document.getElementById("room-" + i);
        room.innerHTML =
          area[i].country +
          (area[i].type === "place" ? "<br>$" + area[i].price : "");
        // console.log(area[i].type)
        if (area[i].type === "chance") {
          // console.log('red')
          room.style.color = "red";
        } else if (area[i].type === "fate") {
          // console.log('yellow')
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
        // console.log('ids: ', this.players)
        for (let playerId of playerKeys) {
          // console.log("pid: ", playerId);
          // console.log("owner: ", area[i].owner);
          if (playerId === area[i].owner) {
            // console.log("地盘： ", playerId, area[i]);
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
            // this.$router.push({ path: "/", query: { roomId: this.roomId } });
            // console.log("加入房间 ", res);
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
      // console.log(step);
      // let player = document.getElementById('player');
      // player.style = 'transform: translate(-200px,0px);';

      console.log('id: ', userId, ' rrr: ', random)
      let dice = document.getElementById("big-dice");
      let smallDice = document.getElementById("group2");

      // 隐藏小骰子，显示骰子动画
      smallDice.style.display = "none";
      dice.style.display = "block";
      // console.log(dice);

      setTimeout(() => {
        // // 获得骰子点数
        // let random = Math.floor(Math.random() * 6) + 1;
        // if (random === 7) {
        //   random = 6;
        // }

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
        console.log('player postion: ', this.players[userId].position.x, this.players[userId].position.y)
        if (step >= 0 && step < 11) {
          end = this.players[userId].position.x - 8.33;
        } else if (step >= 11 && step < 17) {
          end = this.players[userId].position.y - 14.285;
        } else if (step >= 17 && step < 28) {
          end = this.players[userId].position.x + 8.33;
        } else if (step >= 28 && step < 34) {
          end = this.players[userId].position.y + 14.285;
        }
        console.log('step: ', step);
        console.log('end: ', end);
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
      // console.log("userId: ", userId);
      // console.log("当前： ", this.players[userId]);
      let step = this.players[userId].step;
      // console.log("step: ", step, '   end: ', end, "    endStep: ", endStep);

      // 到达目的地
      if (step === endStep) {
        // console.log("end: ", endStep);
        window.clearInterval(timer);
        // console.log("end players: ", this.players);

        if (type === "dice") {
          // 轮到当前用户时投掷按钮可用
          if (
            (this.diceMsg.result === "run" ||
            this.diceMsg.result === "pay") &&
            this.currentPlayer === this.diceMsg.nextPlayer
          ) {
            // if (this.currentPlayer === this.diceMsg.nextPlayer) {
              this.diceButton = false;
            // }
          }

          if (
            this.diceMsg.result === "buy" ||
            this.diceMsg.result === "upgrade" ||
            this.diceMsg.result === "pay" ||
            this.diceMsg.result === "run"
          ) {
            if (userId === this.currentPlayer) {
              if (this.diceMsg.area.type === "place") {
                console.log("ssdf:", this.diceMsg);
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
                console.log(
                  "价格： ",
                  this.diceMsg.area.income[this.diceMsg.area.rank]
                );
                this.players[
                  this.diceMsg._id
                ].money -= this.diceMsg.area.income[this.diceMsg.area.rank];
                this.players[
                  this.diceMsg.payFor
                ].money += this.diceMsg.area.income[this.diceMsg.area.rank];
                Message({
                  message:
                    this.players[this.diceMsg._id].username +
                    " 付给 " +
                    this.players[this.diceMsg.payFor].username +
                    " " +
                    this.diceMsg.area.income[this.diceMsg.area.rank],
                  type: "message",
                  duration: 5 * 1000
                });
              }
              // this.buyDialog.dialogVisible = true;
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

              setTimeout(() => {
                this.tipDialog.dialogVisible = false;
              }, 3000);
            }
          } else if (this.diceMsg.result === "needSaleHouse") {
            let money = 0;
            if (this.diceMsg._id === this.currentPlayer) {
              console.log("msg:", this.diceMsg);
              if (this.diceMsg.area.type === "place") {
                money = this.diceMsg.area.income[this.diceMsg.area.rank];
              } else {
                money = 0 - this.diceMsg.effect.effect;
              }
              this.saleDialog.moneyText = "需支付 " + money + "元";
              this.saleDialog.moneyTextVisible = true;
              this.getCurrentAreas();
            }
            Message({
              message:
                "现金不足，请在倒计时内卖出足够的房产支付 " + money + " 元",
              type: "error",
              duration: 5 * 1000
            });
          } else if (this.diceMsg.result === "nothingToPay") {
            Message({
              message:
                this.players[this.diceMsg.result._id].username + " 破产了",
              type: "warning",
              duration: 5 * 1000
            });
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
          // console.log("走完一格: ", step);
          player.style.left = end + "%";
          window.clearInterval(timer);
          this.players[userId].step += 1;
          // console.log("thi: ", this.players[userId]);
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
              console.log("到达起点");
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
      console.log("step: ", this.players[this.currentPlayer].step);
      this.$socket.emit("buyArea", {
        token: localStorage.richman_token,
        roomId: this.roomId,
        orderId: this.diceMsg.orderId,
        isBuy: isBuy
      });
    },
    getCurrentAreas() {
      console.log("sssss", this.saleDialog);
      this.saleDialog.visible = true;
      game
        .getCurrentAreas(this.roomId)
        .then(res => {
          if (res.errno === 1000) {
            console.log("ressss: ", res);
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
      // console.log('row: ', row);
      this.saleDialog.visible = true;
      this.$socket.emit("saleHouse", {
        token: localStorage.richman_token,
        roomId: this.roomId,
        id: row.id
      });
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
  /* text-align: center; */
  /* background-size: 100% 100%; */
  width: 100%;
  height: 100%;
  /* background: url("../assets/grunge.png"); */
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
  /* background-color: #dbd6cfa1; */
}

#countDownNum {
  width: 100%;
  height: 100%;
  /* margin-top: 30px; */
  /* border-radius: 15%; */
  background-color: #dbd6cfa1;
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

.user-title {
  font-size: 14px;
}

.userColor {
  width: 15px;
  height: 15px;
  /* display: inline-block; */
  border-radius: 50%;
  /* float: left; */
  margin-left: 6%;
  background-color: black;
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
