/*
 Navicat Premium Data Transfer

 Source Server         : liushiyizu
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : 107.182.188.103:3306
 Source Schema         : liushiyizu

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : 65001

 Date: 28/01/2019 13:38:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_article
-- ----------------------------
DROP TABLE IF EXISTS `t_article`;
CREATE TABLE `t_article`  (
  `article_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `article_author` int(11) UNSIGNED NOT NULL COMMENT '作者',
  `article_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章标题',
  `article_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章内容',
  `article_create_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建日期',
  `article_edit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '修改日期',
  PRIMARY KEY (`article_id`) USING BTREE,
  INDEX `articleAuthor`(`article_author`) USING BTREE,
  CONSTRAINT `articleAuthor` FOREIGN KEY (`article_author`) REFERENCES `t_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_article
-- ----------------------------
INSERT INTO `t_article` VALUES (1, 69, 'service', '<p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &quot;Lucida Console&quot;, &quot;Courier New&quot;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\">#查看mysql日志\ncat /var/log/mysqld.log\n\n#删除mysql\nyum remove mysql-server\n\n#安装mysql\nyum install &nbsp;mysql-server\n\n#查看mysql-server的版本\nrpm -qi mysql-server\n#查看mysql 的启动状态\nservice mysqld status\n\n#设置mysqld服务开机自动启动\nchkconfig mysqld on\n\n#通过该命令给root账号设置密码为 root\nmysqladmin -u root password &#39;root&#39;\n\n#登录mysql数据库\nmysql -u root -p\n\n/etc/my.cnf 这是mysql的主配置文件\n/var/lib/mysql &nbsp; mysql数据库的数据库文件存放位置\n\n#查看Linux系统是否在监听 3306 这个端口号\nnetstat -anp | more\n\n\n#安全模式登陆mysql 跳过验证\nmysqld_safe --skip-grant-tables &amp;\n#设置新密码\nupdate mysql.user set authentication_string=password(&#39;root&#39;) where user=&#39;root&#39;\n#保存\nflush privileges;\n#退出\nquit;\n\n\n\n#授权任意ip远程连接数据库\nGRANT ALL PRIVILEGES ON *.* TO &#39;root&#39;@&#39;%&#39; IDENTIFIED BY &#39;root&#39; WITH GRANT OPTION;\nFLUSH PRIVILEGES;//保存生效\n#处理安全模式登陆后修改密码，再次登陆后可能出现的错误\n#ERROR 1045 (28000): Access denied for user &#39;root&#39;@&#39;localhost&#39; (using password: NO) \nSET PASSWORD = PASSWORD(&#39;123456&#39;);\n\n#pm2路径\n/opt/node-v8.6.0-linux-x86/bin/pm2\n\n#淘宝镜像地址\nnpm install packageName --registry=https://registry.npm.taobao.org\n\n//查看文件 -500 从倒数500行开始读\ntail -500f log.log\n//pm2常用命令\nhttp://www.jianshu.com/p/e709b71f12da\n\n#nginx命令\n启动：nginx\n# 强制停止nginx服务器，如果有未处理的数据，丢弃\n停止：nginx -s stop\n# 优雅的停止nginx服务器，如果有未处理的数据，等待处理完成之后停止\nnginx -s quit\n\n#linux下nginx命令\n启动\ncd /usr/local/nginx/sbin\n./nginx\n停止\n#查询nginx主进程号\nps -ef | grep nginx\n#停止进程\nkill -QUIT 主进程号\n#快速停止\nkill -TERM 主进程号\n#强制停止\npkill -9 nginx\n\n\n#git 生成ssh秘钥\n1.打开git bash 输入 ssh-keygen -t rsa -C &quot;1623685118@qq.com&quot;\n2.打开C:Usersliujianzeng.ssh 目录下id_rsa.pub文件复制秘钥\n3.登陆gitHub 进入个人中心（Personal settings）选择 SSH and GPG keys \n4.然后点击New SSH key 新建一个key title随意写，粘贴key确定即可。\n3.测试是否成功在git bash输入ssh -T git@github.com\n如果是第一次的会提示是否continue，输入yes回车再输入密码后就会看到：You’ve successfully authenticated, but GitHub does not provide shell access 。这就表示已成功连上github。\n\n#git 提交项目\n1.git add [file name or .]点代表所有\n2.git status 查看添加状态\n3.git commit -a -m 提交；-a提交修改不需要add命令，-m注释\n4.git push origin master 提交到服务器\n\n\n#vim\n命令行出入 u 为撤销上一步输入\n命令行Ctrl+r 恢复上一步被撤销的操作\n\n\n#linux\nls -a可以显示该目录下的所有文件（包括隐藏文件）。\nrmdir -rf filename 删除文件或文件夹命令（-r：递归删除 &nbsp;-f：忽略不存在文件，从不提示）<br/><br/>-------------重启服务器----------------<br/>启动nginx<br/>cd /usr/local/nginx/sbin<br/>./nginx<br/><br/>启动Redis<br/>cd /redis-4.0.9/src<br/>pm2 start redis-server<br/><br/>启动client服务<br/>cd /root/webapp/liushiyizu/client<br/>pm2 -n client start ./bin/www<br/>启动server服务<br/>cd /root/webapp/liushiyizu/server<br/>pm2 -n server start ./bin/www<br/><br/>#检查服务是否都启动了<br/>ps -ef | grep nginx&nbsp; //nginx 是两个进程<br/>ps -ef | grep redis&nbsp; //redis 是一个进程<br/>service mysqld status //mysql running...<br/><br/>#正常状态<br/>┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬──────┬──────────┐<br/>│ App name │ id │ mode │ pid&nbsp;&nbsp; │ status │ restart │ uptime │ cpu │ mem&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ user │ watching │<br/>├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼──────┼──────────┤<br/>│ redis&nbsp;&nbsp;&nbsp; │ 2&nbsp; │ fork │ 19548 │ online │ 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ 3m&nbsp;&nbsp;&nbsp;&nbsp; │ 0%&nbsp; │ 1.9 MB&nbsp;&nbsp;&nbsp; │ root │ disabled │<br/>│ server&nbsp;&nbsp; │ 1&nbsp; │ fork │ 16507 │ online │ 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ 49m&nbsp;&nbsp;&nbsp; │ 0%&nbsp; │ 26.6 MB&nbsp;&nbsp; │ root │ disabled │<br/>│ www&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ 0&nbsp; │ fork │ 3806&nbsp; │ online │ 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │ 3D&nbsp;&nbsp;&nbsp;&nbsp; │ 0%&nbsp; │ 41.9 MB&nbsp;&nbsp; │ root │ disabled │<br/>└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴──────┴──────────┘</span></p>', '1532572416734', '1547541782603');
INSERT INTO `t_article` VALUES (15, 1, 'admin article', '<p>我就是老大！</p><p>谁敢不听话，我就揍谁！</p><p>我叫江小白，是要成为王的男人！<br/></p>', '1533197890532', '1543566175432');
INSERT INTO `t_article` VALUES (16, 69, '海贼王', '<p>&nbsp;<em>地区：</em>日漫 &nbsp; &nbsp; 						<em>语言：</em>日语\n &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; <em>更新时间：</em>每周日12:00更新1集，VIP抢先看一集\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 					&nbsp;类型：动作 /热血 /冒险 /魔幻 /励志 /番剧</p><p>&nbsp;<br/></p><p><em>简介：</em> 				<span class=\"briefIntroTxt\">有个男人他拥有世界上一切财富、名望和权势，他就是「海盗王」高路德•罗杰。在临死前说过这样一句话：让全世界的人都奔向大海「想要我的财宝吗？想要的话全就拿去吧……！你们去找吧！我把世界上的一切都放在那里了」。后来世界上的人们将这个宝藏称作“一个大秘宝”（One\n Piece），许多人为了争夺大秘宝One \nPiece，无数海盗扬起旗帜，互相斗争，后来就形成了「大海盗时代」。主角蒙奇•D•路飞在遥远的路途上找寻着志同道合的伙伴，携手共进「伟大航线」，目标当上「海盗王」。航海王是一个依着彼此坚毅的友情最终获得胜利，大伙一起朝着梦想扬帆努力的冒险故事。</span></p><p><br/></p>', '1533805810747', '1533805810747');
INSERT INTO `t_article` VALUES (17, 69, '天行九歌', '<p><em>简介：</em><span class=\"briefIntroTxt\">“天行九歌”是玄机科技旗下“秦时明月”的双子星品牌，大预算、大制作、大宣发，是一部战国题材3A级玄幻动画大作，由秦时明月核心主创2016革新呈献，该剧将引领观众进入战国末年，风起云涌的大时代中，战国七雄在乱世中群雄并起，百家争鸣。</span></p>', '1533806609816', '1533806609816');
INSERT INTO `t_article` VALUES (21, 69, 'vim 命令', '<p>1：保存退出</p><p>wq</p><p>2：放弃编辑退出</p><p>q!<br/></p>', '1543828790594', '1545453307117');
INSERT INTO `t_article` VALUES (22, 69, 'pm2 命令', '<p>1:清理日志命令</p><p>pm2 flush</p><p><br/></p>', '1543829191586', '1543829191586');
INSERT INTO `t_article` VALUES (29, 69, '今天又犯错了', '<p>&nbsp; &nbsp; &nbsp; &nbsp; 我觉得自己就是个人渣！意志不坚定，还总找借口！总是对自己说不后悔做错的事，还找借口说没有对与错。现在想想就可笑。唉。。。悲哀啊！什么时候我才能真的长大！现在朋友都觉得我是个小孩，可我都28岁了！</p><p>&nbsp; &nbsp; &nbsp; &nbsp; 今年我二十七八岁！我还是什么都没有！没有稳定的工作，没有遇到我的另一半，没有房子也没有车，更没有存款。不，是现在没有存款了！股票真是个害人的东西！我已经深陷其中，无法自拔！但愿在2019年有个机遇给我，给我一次改过自新的机会！</p>', '1544577975297', '1544577975297');
INSERT INTO `t_article` VALUES (30, 69, '点击选择框之外的地方关闭下拉框', '<ol style=\"list-style-type: decimal;\" class=\" list-paddingleft-2\"><li><p>点击元素之外的地方事件处理，来源于饿了么的clickoutside.js 简书上有个防饿了么实现的js。<br/>&nbsp;&nbsp;&nbsp;&nbsp;https://www.jianshu.com/p/d3ba2dc16cb1</p><p>原生js支持方法 el.contains(el) ,该方法是判断当前元素是否是自动后代元素。<br/></p></li></ol><pre class=\"brush:js;toolbar:false\">document.addEventListener(&#39;click&#39;,&nbsp;function(e){\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(!_this.$refs.selectTree.contains(e.target)){\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_this.isShowTree&nbsp;=&nbsp;false;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});</pre><p><br/></p>', '1545016882871', '1545016882871');
INSERT INTO `t_article` VALUES (34, 69, '工作安排', '<ol style=\"list-style-type: decimal;\" class=\" list-paddingleft-2\"><li><p>案例库管理</p></li><li><p>用户账号信息-git密码优化</p></li><li><p>用户管理-导入学员优化</p></li><li><p>优化 el-scrollbar</p></li><li><p>直播列表，新建直播页面优化<br/></p></li></ol>', '1545643102850', '1548155071741');
INSERT INTO `t_article` VALUES (35, 69, 'Linux zip命令', '<p><strong>语法</strong><br/><br/>zip [-AcdDfFghjJKlLmoqrSTuvVwXyz$][-b &lt;工作目录&gt;][-ll][-n &lt;字尾字符串&gt;][-t &lt;日期时间&gt;][-&lt;压缩效率&gt;][压缩文件][文件...][-i &lt;范本样式&gt;][-x &lt;范本样式&gt;]<br/><br/><strong>参数：</strong><br/><br/><br/>-A 调整可执行的自动解压缩文件。<br/><br/>-b&lt;工作目录&gt; 指定暂时存放文件的目录。<br/><br/>-c 替每个被压缩的文件加上注释。<br/><br/>-d 从压缩文件内删除指定的文件。<br/><br/>-D 压缩文件内不建立目录名称。<br/><br/>-f 此参数的效果和指定&quot;-u&quot;参数类似，但不仅更新既有文件，如果某些文件原本不存在于压缩文件内，使用本参数会一并将其加入压缩文件中。<br/><br/>-F 尝试修复已损坏的压缩文件。<br/><br/>-g 将文件压缩后附加在既有的压缩文件之后，而非另行建立新的压缩文件。<br/><br/>-h 在线帮助。<br/><br/>-i&lt;范本样式&gt; 只压缩符合条件的文件。<br/><br/>-j 只保存文件名称及其内容，而不存放任何目录名称。<br/><br/>-J 删除压缩文件前面不必要的数据。<br/><br/>-k 使用MS-DOS兼容格式的文件名称。<br/><br/>-l 压缩文件时，把LF字符置换成LF+CR字符。<br/><br/>-ll 压缩文件时，把LF+CR字符置换成LF字符。<br/><br/>-L 显示版权信息。<br/><br/>-m 将文件压缩并加入压缩文件后，删除原始文件，即把文件移到压缩文件中。<br/><br/>-n&lt;字尾字符串&gt; 不压缩具有特定字尾字符串的文件。<br/><br/>-o 以压缩文件内拥有最新更改时间的文件为准，将压缩文件的更改时间设成和该文件相同。<br/><br/>-q 不显示指令执行过程。<br/><br/>-r 递归处理，将指定目录下的所有文件和子目录一并处理。<br/><br/>-S 包含系统和隐藏文件。<br/><br/>-t&lt;日期时间&gt; 把压缩文件的日期设成指定的日期。<br/><br/>-T 检查备份文件内的每个文件是否正确无误。<br/><br/>-u 更换较新的文件到压缩文件内。<br/><br/>-v 显示指令执行过程或显示版本信息。<br/><br/>-V 保存VMS操作系统的文件属性。<br/><br/>-w 在文件名称里假如版本编号，本参数仅在VMS操作系统下有效。<br/><br/>-x&lt;范本样式&gt; 压缩时排除符合条件的文件。<br/><br/>-X 不保存额外的文件属性。<br/><br/>-y 直接保存符号连接，而非该连接所指向的文件，本参数仅在UNIX之类的系统下有效。<br/><br/>-z 替压缩文件加上注释。<br/><br/>-$ 保存第一个被压缩文件所在磁盘的卷册名称。<br/><br/>-&lt;压缩效率&gt; 压缩效率是一个介于1-9的数值。<br/><br/><br/><strong>实例</strong><br/><br/><br/><strong>将 /home/html/ 这个目录下所有文件和文件夹打包为当前目录下的 html.zip：</strong><br/><br/>zip -q -r html.zip /home/html<br/><br/><strong>如果在我们在 /home/html 目录下，可以执行以下命令：</strong><br/><br/>zip -q -r html.zip *<br/><br/><strong>从压缩文件 cp.zip 中删除文件 a.c</strong><br/><br/>zip -dv cp.zip a.c</p>', '1548211019223', '1548214379490');

-- ----------------------------
-- Table structure for t_permission
-- ----------------------------
DROP TABLE IF EXISTS `t_permission`;
CREATE TABLE `t_permission`  (
  `permission_id` int(2) UNSIGNED NOT NULL AUTO_INCREMENT,
  `permission_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`permission_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_permission
-- ----------------------------
INSERT INTO `t_permission` VALUES (1, '所有权限');
INSERT INTO `t_permission` VALUES (2, '添加修改权限');
INSERT INTO `t_permission` VALUES (3, '添加权限');
INSERT INTO `t_permission` VALUES (4, '查看权限');
INSERT INTO `t_permission` VALUES (5, '普通权限');

-- ----------------------------
-- Table structure for t_travelNotes
-- ----------------------------
DROP TABLE IF EXISTS `t_travelNotes`;
CREATE TABLE `t_travelNotes`  (
  `notes_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `notes_author` int(11) UNSIGNED NOT NULL COMMENT '作者',
  `notes_title` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `notes_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '内容',
  `notes_create_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `notes_edit_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改时间',
  `notes_money` decimal(10, 2) NULL DEFAULT NULL COMMENT '消费金额',
  `notes_label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签',
  `notes_status` int(11) NULL DEFAULT NULL COMMENT '发布状态',
  PRIMARY KEY (`notes_id`) USING BTREE,
  INDEX `notes_author`(`notes_author`) USING BTREE,
  CONSTRAINT `notes_author` FOREIGN KEY (`notes_author`) REFERENCES `t_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_travelNotes
-- ----------------------------
INSERT INTO `t_travelNotes` VALUES (1, 1, 'update_1531126546132', 'abbbbbsdfsd', '1532572416734', '1532572416734', 12.00, 'ggg', 1);
INSERT INTO `t_travelNotes` VALUES (2, 69, 'aaa', 'fsdljfls', '1532572416734', '1532572416734', 22.00, 'fsjdlf', 1);

-- ----------------------------
-- Table structure for t_travelNotesImage
-- ----------------------------
DROP TABLE IF EXISTS `t_travelNotesImage`;
CREATE TABLE `t_travelNotesImage`  (
  `notes_img_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `notes_img_tid` int(10) UNSIGNED NOT NULL COMMENT '游记id',
  `notes_img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图片地址',
  `notes_img_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片描述',
  `notes_img_create_date` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '上传时间',
  `notes_img_edit_date` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  `notes_img_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片类型',
  `notes_img_width` int(11) NULL DEFAULT NULL COMMENT '图片长度（单位像素）',
  `notes_img_height` int(11) NULL DEFAULT NULL COMMENT '图片宽度（单位像素）',
  `notes_img_size` int(11) NULL DEFAULT NULL COMMENT '图片大小（单位字节）',
  PRIMARY KEY (`notes_img_id`) USING BTREE,
  INDEX `image`(`notes_img_tid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_travelNotesImage
-- ----------------------------
INSERT INTO `t_travelNotesImage` VALUES (1, 1, '/', 'fsdf', '2018-05-14 10:53:01', '2018-05-14 10:53:05', '0', 11, 22, 2313);
INSERT INTO `t_travelNotesImage` VALUES (2, 1, '/upload/head/default.jpg', 'fsdf', '2018-05-14 10:54:57', '2018-05-14 10:54:59', '1', 22, 12, 2121);
INSERT INTO `t_travelNotesImage` VALUES (3, 2, '/2', NULL, '2018-05-14 00:59:36', '2018-05-14 00:59:36', NULL, NULL, NULL, NULL);
INSERT INTO `t_travelNotesImage` VALUES (4, 1, '/12', NULL, '2018-05-14 00:59:39', '2018-05-14 00:59:39', NULL, NULL, NULL, NULL);
INSERT INTO `t_travelNotesImage` VALUES (5, 2, '/1', NULL, '2018-05-14 00:59:32', '2018-05-14 00:59:32', NULL, NULL, NULL, NULL);
INSERT INTO `t_travelNotesImage` VALUES (6, 1, '/1', NULL, '2018-05-14 00:59:30', '2018-05-14 00:59:30', NULL, NULL, NULL, NULL);
INSERT INTO `t_travelNotesImage` VALUES (7, 2, '/4', NULL, '2018-05-14 00:59:27', '2018-05-14 00:59:27', NULL, NULL, NULL, NULL);
INSERT INTO `t_travelNotesImage` VALUES (8, 1, '/3', NULL, '2018-05-14 00:59:24', '2018-05-14 00:59:24', NULL, NULL, NULL, NULL);
INSERT INTO `t_travelNotesImage` VALUES (9, 1, '/2', NULL, '2018-05-14 00:59:23', '2018-05-14 00:59:23', NULL, NULL, NULL, NULL);
INSERT INTO `t_travelNotesImage` VALUES (10, 1, '/1', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '编号',
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `user_nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `user_password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `user_permission` int(11) UNSIGNED NOT NULL DEFAULT 5,
  `user_sex` int(11) UNSIGNED NULL DEFAULT 2 COMMENT '性别 (\r\n0：男 \r\n1：女 \r\n2：未知)',
  `user_age` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '年龄',
  `user_phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `user_email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `user_address` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '住址',
  `user_head_img` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  `user_signature` varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '个性签名',
  `user_create_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建日期',
  PRIMARY KEY (`user_id`) USING BTREE,
  INDEX `user_permission`(`user_permission`) USING BTREE,
  CONSTRAINT `user_permission` FOREIGN KEY (`user_permission`) REFERENCES `t_permission` (`permission_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 70 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (1, '0', 'admin', NULL, '3883fa691e0967118dac21df59fb9b38', 1, 0, 0, '0', '0', '0', '/upload/head/liu.jpg', NULL, NULL);
INSERT INTO `t_user` VALUES (69, 'zNDU2MTI', 'liu', 'mademadedeni', 'e10adc3949ba59abbe56e057f20f883e', 5, 2, 26, '13478905686', '123423423@qq.com', '北京市海淀区苏州街亿方大厦', '/upload/head/head_1517300344018.jpg', '我就是我！每天都要开开心心的！不经历风雨怎能见彩虹。', NULL);

SET FOREIGN_KEY_CHECKS = 1;
