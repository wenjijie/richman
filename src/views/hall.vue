<template>
  <div id="hallRoot">
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
          prop="name"
          label="名字">
        </el-table-column>
        <el-table-column
          prop="max"
          label="最大玩家">
        </el-table-column>
        <el-table-column
          prop="userNum"
          label="玩家数">
        </el-table-column>
        <el-table-column
          prop="initMoney"
          label="起始资金">
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
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.status === '等待'"
              @click="enterRoom(scope.$index, scope.row)">进入</el-button>
              <el-button
              size="mini"
              v-else-if="scope.row.status === '游戏中'"
              disabled
              @click="enterRoom(scope.$index, scope.row)">进入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="createRoom">
      <button @click="createRoomDialogVisible = true">创建房间</button>
    </div>

    <!-- 创建房间表单 -->
    <el-dialog title="创建房间" :visible.sync="createRoomDialogVisible">
      <el-form ref="newRoom" :model="newRoom" :rules="validateRules" label-position="left">
        <el-form-item label="名称" :label-width="'120px'" prop="name">
          <el-input  v-model="newRoom.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="初始资金" :label-width="'120px'" prop="initMoney">
          <el-input v-model="newRoom.initMoney" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最大人数" :label-width="'120px'" prop="max">
          <el-select v-model="newRoom.max" placeholder="请选择最大人数">
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
            <el-option label="8" value="8"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createRoomDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createRoom" :disabled="btnDisable">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import game from "@/api/game";
import { Message } from "element-ui";

export default {
  name: "Hall",
  data() {
    const validateName = (rule, value, callback) => {
      if (!value || value.length < 1) {
        this.btnDisable = true;
        callback(new Error("名称不能为空"));
      } else {
        if (
          this.newRoom.name.length > 0 &&
          this.newRoom.initMoney > 0 &&
          this.newRoom.max >= 2
        ) {
          this.btnDisable = false;
        }
        callback();
      }
    };
    const validateMoney = (rule, value, callback) => {
      try {
        value = Number(value);
        if (!value || value <= 0) {
          this.btnDisable = true;
          callback(new Error("初始资金不能为空且必须大于0"));
        } else {
          if (
            this.newRoom.name.length > 0 &&
            this.newRoom.initMoney > 0 &&
            this.newRoom.max >= 2
          ) {
            this.btnDisable = false;
          }
          callback();
        }
      } catch (error) {
        console.log(error);
        callback(new Error("初始资金不能为空且必须大于0"));
      }
    };
    const validatePlayerNum = (rule, value, callback) => {
      try {
        value = Number(value);
        if (!value || value <= 1) {
          this.btnDisable = true;
          callback(new Error("人数不能为空且必须大于2"));
        } else {
          if (
            this.newRoom.name.length > 0 &&
            this.newRoom.initMoney > 0 &&
            this.newRoom.max >= 2
          ) {
            this.btnDisable = false;
          }
          callback();
        }
      } catch (error) {
        console.log(error);
        callback(new Error("初始资金不能为空且必须大于0"));
      }
    };
    return {
      createRoomDialogVisible: false,
      tableData: [],
      newRoom: {
        name: "",
        initMoney: 0,
        max: 2
      },
      btnDisable: true,
      validateRules: {
        name: [{ required: true, trigger: "blur", validator: validateName }],
        initMoney: [
          { required: true, trigger: "blur", validator: validateMoney }
        ],
        max: [{ required: true, trigger: "blur", validator: validatePlayerNum }]
      }
    };
  },
  mounted() {
    game
      .getRooms()
      .then(res => {
        if (res.errno === 1000) {
          console.log("res: ", res);
          this.tableData = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });

    let sss = (document.getElementsByClassName('roomTable'))[0];
    console.log('sss: ', sss);
    console.log('hei: ', sss.offsetHeight);
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
    }
  }
};
</script>

<style>
#hallRoot {
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

#createRoom {
  margin: 10px;
  float: right;
}

.roomTable {
  width: 80%;
  height: 80%;
  overflow: hidden;
}
</style>
