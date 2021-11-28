const express = require('express');
const router = express.Router();

const imageController = require('../controllers/image.controller');

router.get('/dressStyle/one/1040', imageController.dressStyleOne1040);
router.get('/dressStyle/one/700', imageController.dressStyleOne700);
router.get('/dressStyle/two/1040', imageController.dressStyleTwo1040);
router.get('/dressStyle/two/700', imageController.dressStyleTwo700);

router.get('/carousel/adidas', imageController.adidas);
router.get('/carousel/aes', imageController.aes);
router.get('/carousel/anowhereman', imageController.anowhereman);

router.get('/carousel/beams', imageController.beams);
router.get('/carousel/bershka', imageController.bershka);
router.get('/carousel/burberry', imageController.burberry);

router.get('/carousel/celine', imageController.celine);
router.get('/carousel/champion', imageController.champion);
router.get('/carousel/chanel', imageController.chanel);
router.get('/carousel/chuu', imageController.chuu);
router.get('/carousel/clubmonaco', imageController.clubmonaco);
router.get('/carousel/coach', imageController.coach);
router.get('/carousel/coen', imageController.coen);
router.get('/carousel/converse', imageController.converse);

router.get('/carousel/darkvictory', imageController.darkvictory);
router.get('/carousel/dior', imageController.dior);

router.get('/carousel/fila', imageController.fila);

router.get('/carousel/66girls', imageController.girls66);
router.get('/carousel/g2000', imageController.g2000);
router.get('/carousel/gap', imageController.gap);
router.get('/carousel/genquo', imageController.genquo);
router.get('/carousel/gievesandhawkes', imageController.gievesandhawkes);
router.get('/carousel/globalwork', imageController.globalwork);
router.get('/carousel/goopi', imageController.goopi);
router.get('/carousel/gu', imageController.gu);
router.get('/carousel/gucci', imageController.gucci);
router.get('/carousel/guerrillagroup', imageController.guerrillagroup);

router.get('/carousel/handm', imageController.handm);
router.get('/carousel/hotping', imageController.hotping);

router.get('/carousel/ifandn', imageController.ifandn);
router.get('/carousel/ig', imageController.ig);

router.get('/carousel/lativ', imageController.lativ);
router.get('/carousel/lovfee', imageController.lovfee);
router.get('/carousel/lowrysfarm', imageController.lowrysfarm);

router.get('/carousel/maddness', imageController.maddness);
router.get('/carousel/massimodutti', imageController.massimodutti);
router.get('/carousel/meierdotq', imageController.meierdotq);
router.get('/carousel/michaelkors', imageController.michaelkors);
router.get('/carousel/mouggan', imageController.mouggan);
router.get('/carousel/mixxmix', imageController.mixxmix);
router.get('/carousel/mango', imageController.mango);

router.get('/carousel/nike', imageController.nike);
router.get('/carousel/nb', imageController.nb);
router.get('/carousel/nerdy', imageController.nerdy);
router.get('/carousel/nikoand', imageController.nikoand);
router.get('/carousel/ninetheory', imageController.ninetheory);
router.get('/carousel/notag', imageController.notag);

router.get('/carousel/ob', imageController.ob);
router.get('/carousel/offwhite', imageController.offwhite);
router.get('/carousel/oneboy', imageController.oneboy);
router.get('/carousel/oqliq', imageController.oqliq);

router.get('/carousel/pazzo', imageController.pazzo);
router.get('/carousel/phantaci', imageController.phantaci);
router.get('/carousel/professordote', imageController.professordote);
router.get('/carousel/pullandbear', imageController.pullandbear);
router.get('/carousel/puma', imageController.puma);

router.get('/carousel/queenshop', imageController.queenshop);

router.get('/carousel/righton', imageController.righton);

router.get('/carousel/sealson', imageController.sealson);
router.get('/carousel/spao', imageController.spao);
router.get('/carousel/sstandc', imageController.sstandc);
router.get('/carousel/stayreal', imageController.stayreal);
router.get('/carousel/stussy', imageController.stussy);
router.get('/carousel/suitangtang', imageController.suitangtang);
router.get('/carousel/suitsupply', imageController.suitsupply);
router.get('/carousel/superdry', imageController.superdry);
router.get('/carousel/supreme', imageController.supreme);
router.get('/carousel/syndro', imageController.syndro);
router.get('/carousel/stylenanda', imageController.stylenanda);

router.get('/carousel/th', imageController.th);
router.get('/carousel/tiffany', imageController.tiffany);

router.get('/carousel/ua', imageController.ua);
router.get('/carousel/uq', imageController.uq);
router.get('/carousel/ur', imageController.ur);
router.get('/carousel/vans', imageController.vans);

router.get('/carousel/wd', imageController.wd);
router.get('/carousel/wisdom', imageController.wisdom);

router.get('/carousel/ysl', imageController.ysl);

router.get('/carousel/zara', imageController.zara);

router.get('/suggestion/am_r_1_20.jpg', imageController.am_r_1_20dotjpg);
router.get('/suggestion/am_r_1_20.png', imageController.am_r_1_20dotpng);
router.get('/suggestion/am_r_1_21.jpg', imageController.am_r_1_21dotjpg);
router.get('/suggestion/am_r_1_21.png', imageController.am_r_1_21dotpng);
router.get('/suggestion/am_r_1_25.jpg', imageController.am_r_1_25dotjpg);
router.get('/suggestion/am_r_1_25.png', imageController.am_r_1_25dotpng);

router.get('/suggestion/am_r_2_20.jpg', imageController.am_r_2_20dotjpg);
router.get('/suggestion/am_r_2_20.png', imageController.am_r_2_20dotpng);
router.get('/suggestion/am_r_2_21.jpg', imageController.am_r_2_21dotjpg);
router.get('/suggestion/am_r_2_21.png', imageController.am_r_2_21dotpng);
router.get('/suggestion/am_r_2_25.jpg', imageController.am_r_2_25dotjpg);
router.get('/suggestion/am_r_2_25.png', imageController.am_r_2_25dotpng);

router.get('/suggestion/am_r_3_20.jpg', imageController.am_r_3_20dotjpg);
router.get('/suggestion/am_r_3_20.png', imageController.am_r_3_20dotpng);
router.get('/suggestion/am_r_3_21.jpg', imageController.am_r_3_21dotjpg);
router.get('/suggestion/am_r_3_21.png', imageController.am_r_3_21dotpng);
router.get('/suggestion/am_r_3_25.jpg', imageController.am_r_3_25dotjpg);
router.get('/suggestion/am_r_3_25.png', imageController.am_r_3_25dotpng);

router.get('/suggestion/am_s_1_20.jpg', imageController.am_s_1_20dotjpg);
router.get('/suggestion/am_s_1_20.png', imageController.am_s_1_20dotpng);
router.get('/suggestion/am_s_1_21.jpg', imageController.am_s_1_21dotjpg);
router.get('/suggestion/am_s_1_21.png', imageController.am_s_1_21dotpng);
router.get('/suggestion/am_s_1_25.jpg', imageController.am_s_1_25dotjpg);
router.get('/suggestion/am_s_1_25.png', imageController.am_s_1_25dotpng);

router.get('/suggestion/am_s_2_20.jpg', imageController.am_s_2_20dotjpg);
router.get('/suggestion/am_s_2_20.png', imageController.am_s_2_20dotpng);
router.get('/suggestion/am_s_2_21.jpg', imageController.am_s_2_21dotjpg);
router.get('/suggestion/am_s_2_21.png', imageController.am_s_2_21dotpng);
router.get('/suggestion/am_s_2_25.jpg', imageController.am_s_2_25dotjpg);
router.get('/suggestion/am_s_2_25.png', imageController.am_s_2_25dotpng);

router.get('/suggestion/am_s_3_20.jpg', imageController.am_s_3_20dotjpg);
router.get('/suggestion/am_s_3_20.png', imageController.am_s_3_20dotpng);
router.get('/suggestion/am_s_3_21.jpg', imageController.am_s_3_21dotjpg);
router.get('/suggestion/am_s_3_21.png', imageController.am_s_3_21dotpng);
router.get('/suggestion/am_s_3_25.jpg', imageController.am_s_3_25dotjpg);
router.get('/suggestion/am_s_3_25.png', imageController.am_s_3_25dotpng);

router.get('/suggestion/pm_d_1_20.jpg', imageController.pm_d_1_20dotjpg);
router.get('/suggestion/pm_d_1_20.png', imageController.pm_d_1_20dotpng);
router.get('/suggestion/pm_d_1_21.jpg', imageController.pm_d_1_21dotjpg);
router.get('/suggestion/pm_d_1_21.png', imageController.pm_d_1_21dotpng);
router.get('/suggestion/pm_d_1_25.jpg', imageController.pm_d_1_25dotjpg);
router.get('/suggestion/pm_d_1_25.png', imageController.pm_d_1_25dotpng);

router.get('/suggestion/pm_d_2_20.jpg', imageController.pm_d_2_20dotjpg);
router.get('/suggestion/pm_d_2_20.png', imageController.pm_d_2_20dotpng);
router.get('/suggestion/pm_d_2_21.jpg', imageController.pm_d_2_21dotjpg);
router.get('/suggestion/pm_d_2_21.png', imageController.pm_d_2_21dotpng);
router.get('/suggestion/pm_d_2_25.jpg', imageController.pm_d_2_25dotjpg);
router.get('/suggestion/pm_d_2_25.png', imageController.pm_d_2_25dotpng);

router.get('/suggestion/pm_d_3_20.jpg', imageController.pm_d_3_20dotjpg);
router.get('/suggestion/pm_d_3_20.png', imageController.pm_d_3_20dotpng);
router.get('/suggestion/pm_d_3_21.jpg', imageController.pm_d_3_21dotjpg);
router.get('/suggestion/pm_d_3_21.png', imageController.pm_d_3_21dotpng);
router.get('/suggestion/pm_d_3_25.jpg', imageController.pm_d_3_25dotjpg);
router.get('/suggestion/pm_d_3_25.png', imageController.pm_d_3_25dotpng);

router.get('/angel/1', imageController.angel_1);
router.get('/angel/2', imageController.angel_2);
router.get('/angel/3', imageController.angel_3);
router.get('/angel/4', imageController.angel_4);
router.get('/angel/5', imageController.angel_5);
router.get('/angel/6', imageController.angel_6);

router.get('/real/10-1', imageController.real_10_1);
router.get('/real/14-1', imageController.real_14_1);
router.get('/real/15-1', imageController.real_15_1);
router.get('/real/18-1', imageController.real_18_1);
router.get('/real/19-1', imageController.real_19_1);
router.get('/real/20-1', imageController.real_20_1);
router.get('/real/20-2', imageController.real_20_2);
router.get('/real/21-1', imageController.real_21_1);
router.get('/real/22-1', imageController.real_22_1);
router.get('/real/22-1-1', imageController.real_22_1_1);
router.get('/real/22-2', imageController.real_22_2);
router.get('/real/23-1', imageController.real_23_1);
router.get('/real/23-2', imageController.real_23_2);
router.get('/real/25-1', imageController.real_25_1);
router.get('/real/25-1-1', imageController.real_25_1_1);
router.get('/real/26-1', imageController.real_26_1);
router.get('/real/32-1', imageController.real_32_1);
router.get('/real/33', imageController.real_33);
router.get('/real/40-1', imageController.real_40_1);
router.get('/real/40-2', imageController.real_40_2);

module.exports = router;
