<template>
  <div id="root">
    <h1>游戏结果</h1>
    <div class="result">
      <el-table
        :data="tableData"
        stripe
        height="(document.getElementsByClassName('roomTable'))[0].offsetHeight)"
        style="height: 100%">
        <!-- <el-table-column
          label="  ">
        </el-table-column> -->
        <el-table-column
          prop="rank"
          label="排名">
        </el-table-column>
        <el-table-column
          prop="rank"
          label="颜色">
        </el-table-column>
        <el-table-column
          prop="username"
          label="名字">
        </el-table-column>
        <el-table-column
          prop="money"
          label="剩余资金">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '等待' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.status==='bankrupt'?'破产':'胜利'}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="sure">
      <button @click="sure()">确定</button>
    </div>
  </div>
</template>

<script>
import game from "@/api/game";
import { Message } from "element-ui";

export default {
  name: "Hall",
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    game
      .getGameResult(this.$route.query.roomId)
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
    /**
     * 回到大厅
     */
    sure() {
      this.$router.push({ path: "/hall" });
    }
  }
};
</script>

<style>
#root {
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

#sure {
  margin-bottom: 6%;
  margin-top: 5%;
  float: right;
}

.result {
  width: 80%;
  height: 80%;
  overflow: hidden;
}
</style>
