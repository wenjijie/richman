<template>
  <div id="hallRoot">
    <div id="barCan">
      <div class="topBar">
        <img id="back" src="@/assets/img/返回.png" alt="返回" @click="back()">
        <img id="persion" src="@/assets/img/我的.png" alt="个人中心">
        <div id="name">{{user.username}}</div>
      </div>
    </div>
    
    <div class="roomTable">
      <el-table
        :data="tableData"
        stripe
        height="(document.getElementsByClassName('roomTable'))[0].offsetHeight)"
        style="height: 100%">
        <!-- <el-table-column
          label="  ">
        </el-table-column> -->
        <el-table-column
          prop="createdAt"
          label="时间">
          <template slot-scope="scope">
              {{new Date(scope.row.createdAt).getFullYear()+'-'+(new Date(scope.row.createdAt).getMonth()+1)+'-'+new Date(scope.row.createdAt).getDate()+'  '+new Date(scope.row.createdAt).getHours()+':'+new Date(scope.row.createdAt).getMinutes()}}
          </template>
        </el-table-column>
        <el-table-column
          prop="players.rank"
          label="名次">
        </el-table-column>
        <!-- <el-table-column
          prop="max"
          label="最大玩家">
        </el-table-column> -->
        <el-table-column
          prop="userNum"
          label="玩家数">
        </el-table-column>
        <el-table-column
          prop="initMoney"
          label="起始资金">
        </el-table-column>
        <el-table-column
          prop="players.money"
          label="最终资金">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '等待' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.status === '等待'"
              @click="enterRoom(scope.$index, scope.row)">进入</el-button>
            <el-button
              size="mini"
              v-else-if="scope.row.status === '游戏中' && scope.row.playerIds.split(',').indexOf(userId) === -1"
              disabled>进入</el-button>
            <el-button
              size="mini"
              v-else-if="scope.row.status === '游戏中' && scope.row.playerIds.split(',').indexOf(userId) !== -1"
              @click="enterRoom(scope.$index, scope.row)">回到游戏</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div id="createRoom">
      <!-- <button @click="createRoomDialogVisible = true">创建房间</button> -->
    </div>
  </div>
</template>

<script>
import game from "@/api/game";
import user from "@/api/user";
import { Message } from "element-ui";

export default {
  name: "Hall",
  data() {
    return {
      createRoomDialogVisible: false,
      tableData: [],
      userId: "",
      user: {},
      newRoom: {
        name: "",
        initMoney: 0,
        max: 2
      },
      btnDisable: true
    };
  },
  mounted() {
    this.userId = localStorage.userId;
    user
      .current()
      .then(res => {
        if (res.errno === 1000) {
          console.log("res: ", res);
          this.user = res.data
        }
      })
      .catch(err => {
        console.log(err);
      });

    user
      .getGameInfo(this.userId)
      .then(res => {
        if (res.errno === 1000) {
          console.log("res: ", res);
          this.tableData = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    enterRoom(index, row) {
      console.log(row);
      game
        .joinRoom(row.roomId)
        .then(res => {
          console.log("fanhui: ", res);
          if (res.errno === 1000 || res.errno === 1020) {
            this.$router.push({ path: "/", query: { roomId: row.roomId } });
            console.log("加入房间 ", res);
          } else if (res.errno === 1050 || res.errno === 1052) {
            console.log("52");
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
      // this.$router.push({ path: "/", query: { roomId: row.roomId } });
    },
    createRoom() {
      console.log("new", this.newRoom);
      game
        .createRoom(this.newRoom)
        .then(res => {
          console.log("创建“ ", res);
          if (res.errno === 1000) {
            this.$router.push({
              path: "/",
              query: { roomId: res.data.roomId }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.createRoomDialogVisible = false;
    },
    back() {
      console.log("sss");
      this.$router.push({ path: "/hall" });
    }
  }
};
</script>

<style>
#barCan {
  /* background-color: aquamarine; */
  height: 10%;
  width: 100%;
}

.topBar {
  height: 50px;
  width: 100%;
  align-self: flex-start;
  /* justify-self: flex-end; */
  background-color: #d1d2d39c;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

#back {
  float: left;
  height: 80%;
  margin-top: 3px;
  margin-left: 10px;
  cursor: pointer;
}

#persion {
  float: right;
  height: 80%;
  margin-top: 3px;
  margin-right: 10px;
}

#name {
  float: right;
  margin-right: 12px;
  margin-top: 12px;
}

#hallRoot {
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

#createRoom {
  height: 5%;
  margin: 10px;
  float: right;
}

.roomTable {
  width: 80%;
  height: 85%;
  overflow: hidden;
}
</style>
