# Vision Game Lab · Neon Dodge

> 可直接玩的浏览器小游戏

![Stage](https://img.shields.io/badge/stage-runnable_demo-10b981?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-0ea5e9?style=flat-square)



## What runs today

已实现键盘/鼠标/触屏移动、随机障碍、奖励球、三条生命、粒子反馈、暂停、难度增长、重开与本地最高分。A/D 或方向键控制，P 暂停；鼠标在画布内移动也可控制。当前不含摄像头、姿态识别或 MediaPipe。

## Quick start

```bash
git clone https://github.com/foxviot/vision-game-lab.git
cd vision-game-lab
python -m http.server 8000
```

## Custom input

```text
Open http://localhost:8000 then click Start / Restart
```

## Results and limits

样例输出来自实际运行。速度随硬件与依赖版本变化；示例结果不代表生产环境性能。默认运行不需要 API Key、GPU 或云服务。

## Attribution

详见 [ATTRIBUTION.md](ATTRIBUTION.md)。使用浏览器标准 Canvas/KeyboardEvent API；当前游戏代码为本仓库新增，不依赖外部引擎或第三方素材。

本仓库新增代码采用 [MIT](LICENSE)，依赖库和数据保持各自许可证。本项目不代表上游官方项目。
