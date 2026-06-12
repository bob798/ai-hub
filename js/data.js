/* ============================================================
 * AI 学径 — 课程数据
 * 全部静态数据：课程大纲、测验、闪卡、面试题、术语表
 * ============================================================ */

const CURRICULUM = [
  {
    id: "s1",
    title: "阶段一 · 基础准备",
    subtitle: "Python 与数学基础",
    weeks: "建议 3–5 周",
    desc: "打好编程与数学地基。不必精通全部数学，掌握「够用」的核心概念即可开始机器学习。",
    lessons: [
      {
        id: "s1l1",
        title: "Python 快速上手",
        minutes: 90,
        content: `
<p>Python 是 AI 领域的事实标准语言。转型者的目标不是成为软件工程专家，而是<strong>能流畅地用 Python 处理数据、调用库、写实验脚本</strong>。</p>
<h3>必须掌握</h3>
<ul>
<li>基础语法：变量、条件、循环、函数、异常处理</li>
<li>数据结构：list / dict / set / tuple，列表推导式</li>
<li>文件读写、JSON 处理、虚拟环境（venv / conda）</li>
<li>面向对象基础：类、继承（看懂框架代码即可）</li>
</ul>
<h3>学习建议</h3>
<p>不要陷在语法教程里。学完基础后立刻开始写小项目：爬取一个网页、统计一份 CSV、写一个命令行小工具。<strong>两周内进入 NumPy/Pandas</strong>。</p>
<h3>检验标准</h3>
<p>能独立写出 100 行左右的脚本完成一个实际小任务，遇到报错会读 Traceback 并搜索解决。</p>`,
        resources: [
          { name: "Python 官方教程（中文）", url: "https://docs.python.org/zh-cn/3/tutorial/" },
          { name: "廖雪峰 Python 教程", url: "https://liaoxuefeng.com/books/python/introduction/" },
          { name: "Kaggle Learn: Python", url: "https://www.kaggle.com/learn/python" }
        ]
      },
      {
        id: "s1l2",
        title: "NumPy 与 Pandas 数据处理",
        minutes: 120,
        content: `
<p>几乎所有 AI 工作都从数据处理开始。NumPy 提供高效的多维数组运算，Pandas 提供表格数据操作——它们是后续一切的基础。</p>
<h3>NumPy 核心</h3>
<ul>
<li>ndarray 的创建、形状（shape）、切片与索引</li>
<li><strong>广播机制（Broadcasting）</strong>——理解它能看懂大部分深度学习代码</li>
<li>向量化运算：用矩阵运算替代 for 循环</li>
</ul>
<h3>Pandas 核心</h3>
<ul>
<li>DataFrame / Series 的增删改查、缺失值处理</li>
<li>groupby 聚合、merge 连接、透视表</li>
<li>读写 CSV / Excel / JSON</li>
</ul>
<h3>实战练习</h3>
<p>找一份真实数据集（如 Kaggle 的 Titanic），完成：数据清洗 → 缺失值填充 → 分组统计 → 简单可视化（matplotlib）。</p>`,
        resources: [
          { name: "NumPy 官方快速入门", url: "https://numpy.org/doc/stable/user/quickstart.html" },
          { name: "Pandas 10 分钟入门", url: "https://pandas.pydata.org/docs/user_guide/10min.html" },
          { name: "Kaggle Titanic 数据集", url: "https://www.kaggle.com/c/titanic" }
        ]
      },
      {
        id: "s1l3",
        title: "线性代数：够用就好",
        minutes: 100,
        content: `
<p>深度学习本质上是<strong>矩阵运算的组合</strong>。你需要的不是证明定理，而是建立几何直觉。</p>
<h3>核心概念</h3>
<ul>
<li><strong>向量与矩阵</strong>：加法、数乘、转置；把数据想象成空间中的点</li>
<li><strong>矩阵乘法</strong>：理解为线性变换 / 多个加权求和的组合（神经网络每一层就是它）</li>
<li><strong>点积与范数</strong>：衡量相似度（embedding 检索的根基）与长度</li>
<li>特征值/特征向量、SVD：了解概念即可（PCA 降维会用到）</li>
</ul>
<h3>直觉建立</h3>
<p>强烈推荐 3Blue1Brown 的《线性代数的本质》系列视频——用动画建立几何直觉，远胜刷题。</p>
<h3>检验标准</h3>
<p>看到 <code>y = Wx + b</code> 能立刻明白每个符号的形状和含义；明白为什么两个向量的余弦相似度能衡量「语义相近」。</p>`,
        resources: [
          { name: "3Blue1Brown 线性代数的本质（B站官方）", url: "https://www.bilibili.com/video/BV1ys411472E" },
          { name: "Khan Academy 线性代数", url: "https://www.khanacademy.org/math/linear-algebra" }
        ]
      },
      {
        id: "s1l4",
        title: "概率统计与微积分要点",
        minutes: 100,
        content: `
<p>概率统计帮你理解「模型在做什么」，微积分帮你理解「模型怎么学习」。</p>
<h3>概率统计核心</h3>
<ul>
<li>条件概率与<strong>贝叶斯定理</strong>（朴素贝叶斯、生成模型的根基）</li>
<li>常见分布：伯努利、高斯（正态）分布</li>
<li>期望、方差、标准差；大数定律的直觉</li>
<li><strong>最大似然估计（MLE）</strong>：训练模型 = 找到让数据出现概率最大的参数</li>
</ul>
<h3>微积分核心</h3>
<ul>
<li>导数 = 变化率 = 「往哪个方向调参数能让损失变小」</li>
<li><strong>链式法则</strong>：反向传播算法的全部数学基础</li>
<li>偏导数与梯度：多维空间里的「最陡下降方向」</li>
</ul>
<h3>学习建议</h3>
<p>这一课的目标是为「梯度下降」和「交叉熵损失」扫清障碍。学到能看懂这两个概念的推导即可前进，缺什么回头补什么。</p>`,
        resources: [
          { name: "3Blue1Brown 微积分的本质", url: "https://www.bilibili.com/video/BV1qW411N7FU" },
          { name: "Seeing Theory 可视化概率论", url: "https://seeing-theory.brown.edu/cn.html" }
        ]
      }
    ]
  },
  {
    id: "s2",
    title: "阶段二 · 机器学习核心",
    subtitle: "经典 ML 理论与 scikit-learn 实战",
    weeks: "建议 4–6 周",
    desc: "理解机器学习的核心思想：从数据中学习规律。经典 ML 是面试必考，也是理解深度学习的前提。",
    lessons: [
      {
        id: "s2l1",
        title: "机器学习是什么",
        minutes: 60,
        content: `
<p>传统编程：人写规则，数据进规则出结果。机器学习：<strong>给数据和结果，让算法自己找规则</strong>。</p>
<h3>三大范式</h3>
<ul>
<li><strong>监督学习</strong>：有标注数据（输入→正确答案），学习映射。如房价预测、垃圾邮件分类</li>
<li><strong>无监督学习</strong>：无标注，发现数据内在结构。如用户聚类、降维</li>
<li><strong>强化学习</strong>：智能体通过与环境交互、获得奖励来学习策略。如游戏 AI、RLHF</li>
</ul>
<h3>核心工作流</h3>
<p>定义问题 → 收集数据 → 特征工程 → 选模型 → 训练 → 评估 → 调优 → 部署。<strong>实际工作中 70% 时间花在数据上</strong>。</p>
<h3>关键术语</h3>
<p>特征（feature）、标签（label）、训练集/验证集/测试集、损失函数、过拟合/欠拟合、泛化能力。这些词必须像母语一样熟悉。</p>`,
        resources: [
          { name: "吴恩达《机器学习》课程（Coursera）", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
          { name: "Google 机器学习速成课程（中文）", url: "https://developers.google.com/machine-learning/crash-course?hl=zh-cn" }
        ]
      },
      {
        id: "s2l2",
        title: "监督学习：回归与分类",
        minutes: 120,
        content: `
<p>监督学习是工业界应用最广的范式，两大任务：<strong>回归</strong>（预测连续值）与<strong>分类</strong>（预测类别）。</p>
<h3>必学算法</h3>
<ul>
<li><strong>线性回归</strong>：最简单也最重要。理解损失函数（MSE）+ 梯度下降的完整闭环</li>
<li><strong>逻辑回归</strong>：名字带回归其实是分类。Sigmoid + 交叉熵损失，是神经网络单个神经元的原型</li>
<li><strong>决策树</strong>：可解释性强；理解信息增益/基尼系数</li>
<li><strong>随机森林 / 梯度提升树（XGBoost、LightGBM）</strong>：表格数据的工业界王者，Kaggle 常胜将军</li>
<li>SVM、KNN、朴素贝叶斯：理解思想，面试常问</li>
</ul>
<h3>核心思想</h3>
<p>所有监督学习都在做同一件事：<strong>定义损失函数衡量「预测有多错」，然后调整参数让损失最小</strong>。梯度下降就是「沿着损失下降最快的方向小步走」。</p>`,
        resources: [
          { name: "scikit-learn 官方教程", url: "https://scikit-learn.org/stable/tutorial/index.html" },
          { name: "《动手学机器学习》(Hands-On ML) 书籍", url: "https://github.com/ageron/handson-ml3" }
        ]
      },
      {
        id: "s2l3",
        title: "无监督学习与特征工程",
        minutes: 90,
        content: `
<p>没有标签时，让数据自己「说话」。</p>
<h3>聚类</h3>
<ul>
<li><strong>K-Means</strong>：最常用。理解算法迭代过程（分配→更新中心）与 K 值选择（肘部法则）</li>
<li>层次聚类、DBSCAN：了解适用场景</li>
</ul>
<h3>降维</h3>
<ul>
<li><strong>PCA 主成分分析</strong>：找方差最大的方向投影。用于可视化与去噪</li>
<li>t-SNE / UMAP：高维数据可视化利器（看 embedding 分布常用）</li>
</ul>
<h3>特征工程</h3>
<p>「数据和特征决定了上限，模型只是逼近上限」。掌握：</p>
<ul>
<li>数值特征：标准化（StandardScaler）、归一化、分箱</li>
<li>类别特征：One-Hot 编码、Label 编码、目标编码</li>
<li>缺失值与异常值处理策略</li>
</ul>`,
        resources: [
          { name: "scikit-learn 聚类文档", url: "https://scikit-learn.org/stable/modules/clustering.html" },
          { name: "Kaggle Learn: 特征工程", url: "https://www.kaggle.com/learn/feature-engineering" }
        ]
      },
      {
        id: "s2l4",
        title: "模型评估与调优",
        minutes: 90,
        content: `
<p>「我的模型准确率 99%」可能毫无意义——如果 99% 的样本本来就是负类。<strong>评估是 ML 工程师的核心素养</strong>。</p>
<h3>评估指标</h3>
<ul>
<li>分类：准确率、<strong>精确率（Precision）、召回率（Recall）、F1</strong>、ROC-AUC、混淆矩阵</li>
<li>回归：MSE、RMSE、MAE、R²</li>
<li>理解业务取舍：癌症筛查要高召回，垃圾邮件要高精确</li>
</ul>
<h3>过拟合与欠拟合</h3>
<ul>
<li>过拟合 = 背题；欠拟合 = 没学会。通过训练/验证误差曲线诊断</li>
<li>对策：正则化（L1/L2）、更多数据、Dropout、早停、交叉验证</li>
</ul>
<h3>调优方法</h3>
<p>K 折交叉验证、网格搜索（GridSearchCV）、随机搜索、贝叶斯优化（Optuna）。记住原则：<strong>测试集只能用一次</strong>。</p>`,
        resources: [
          { name: "scikit-learn 模型评估文档", url: "https://scikit-learn.org/stable/modules/model_evaluation.html" },
          { name: "Google ML 速成：分类指标", url: "https://developers.google.com/machine-learning/crash-course/classification?hl=zh-cn" }
        ]
      },
      {
        id: "s2l5",
        title: "实战：完整 ML 项目",
        minutes: 180,
        content: `
<p>把前四课串成一个完整项目，这将成为你作品集的第一个条目。</p>
<h3>项目建议（三选一）</h3>
<ul>
<li><strong>Titanic 生还预测</strong>（入门经典）：二分类，重点练特征工程</li>
<li><strong>房价预测</strong>（House Prices）：回归，重点练数据清洗与集成模型</li>
<li>自选业务数据：信用违约、用户流失预测——与你原行业结合更佳（转型者的独特优势！）</li>
</ul>
<h3>必须完成的环节</h3>
<ol>
<li>EDA 探索性分析（分布、相关性、可视化）</li>
<li>特征工程（至少 3 种技巧）</li>
<li>对比 3 个以上模型（基线 → 树模型 → 集成）</li>
<li>交叉验证 + 超参调优</li>
<li>写一份 README：问题定义、方法、结果、反思</li>
</ol>
<p><strong>把代码放上 GitHub</strong>——从现在开始积累公开作品。</p>`,
        resources: [
          { name: "Kaggle 入门竞赛列表", url: "https://www.kaggle.com/competitions?listOption=gettingStarted" },
          { name: "如何写好数据项目 README", url: "https://github.com/matiassingers/awesome-readme" }
        ]
      }
    ]
  },
  {
    id: "s3",
    title: "阶段三 · 深度学习",
    subtitle: "神经网络与 PyTorch",
    weeks: "建议 5–7 周",
    desc: "进入现代 AI 的核心领域。理解神经网络的工作原理，并用 PyTorch 亲手实现。",
    lessons: [
      {
        id: "s3l1",
        title: "神经网络与反向传播",
        minutes: 120,
        content: `
<p>神经网络 = <strong>多层「线性变换 + 非线性激活」的堆叠</strong>。理论上足够宽的网络可以逼近任何函数。</p>
<h3>前向传播</h3>
<p>每一层做 <code>a = σ(Wx + b)</code>：线性加权 → 激活函数。常见激活：ReLU（主流）、Sigmoid、Tanh、GELU（Transformer 用）。<strong>没有激活函数，再深的网络也等价于一层线性变换</strong>。</p>
<h3>反向传播</h3>
<ul>
<li>本质 = 链式法则的高效实现：从损失出发，逐层计算每个参数的梯度</li>
<li>梯度下降变体：SGD → Momentum → <strong>Adam / AdamW</strong>（默认选择）</li>
<li>学习率是最重要的超参数；理解学习率过大/过小的症状</li>
</ul>
<h3>训练技巧</h3>
<p>Batch Normalization、Dropout、权重初始化、梯度裁剪、学习率调度（warmup + decay）。先记住「是什么、解决什么问题」。</p>`,
        resources: [
          { name: "3Blue1Brown 神经网络系列", url: "https://www.bilibili.com/video/BV1bx411M7Zx" },
          { name: "Andrej Karpathy: Neural Networks Zero to Hero", url: "https://karpathy.ai/zero-to-hero.html" }
        ]
      },
      {
        id: "s3l2",
        title: "PyTorch 实战入门",
        minutes: 150,
        content: `
<p>PyTorch 是研究界与 LLM 时代的主流框架。学习曲线友好：它基本就是「带自动求导和 GPU 加速的 NumPy」。</p>
<h3>核心 API</h3>
<ul>
<li><code>torch.Tensor</code>：创建、运算、与 NumPy 互转、<code>.to('cuda')</code></li>
<li><strong>autograd</strong>：<code>requires_grad</code>、<code>loss.backward()</code> 自动算梯度</li>
<li><code>nn.Module</code>：定义模型的标准方式（<code>__init__</code> 定义层，<code>forward</code> 定义计算）</li>
<li><code>Dataset / DataLoader</code>：数据加载与批处理</li>
<li>优化器与训练循环：forward → loss → <code>backward()</code> → <code>step()</code> → <code>zero_grad()</code></li>
</ul>
<h3>必做练习</h3>
<ol>
<li>用纯 PyTorch 手写线性回归（不用 nn.Module），理解 autograd</li>
<li>用 nn.Module 在 MNIST 上训练一个全连接网络，达到 97%+ 准确率</li>
<li>把训练循环写成可复用的模板（含验证、保存最优模型）</li>
</ol>`,
        resources: [
          { name: "PyTorch 官方 60 分钟入门", url: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html" },
          { name: "PyTorch 官方教程合集", url: "https://pytorch.org/tutorials/" }
        ]
      },
      {
        id: "s3l3",
        title: "卷积神经网络（CNN）与计算机视觉",
        minutes: 120,
        content: `
<p>CNN 利用图像的局部性与平移不变性，用<strong>卷积核扫描图像提取特征</strong>，参数量远小于全连接。</p>
<h3>核心组件</h3>
<ul>
<li>卷积层：卷积核、步幅（stride）、填充（padding）、感受野</li>
<li>池化层：MaxPool 下采样；现代网络多用 stride 卷积替代</li>
<li>经典架构演进：LeNet → AlexNet → VGG → <strong>ResNet（残差连接是必懂思想）</strong></li>
</ul>
<h3>迁移学习</h3>
<p>实际工作 90% 的 CV 任务不从零训练：加载 ImageNet 预训练模型 → 替换最后的分类头 → 在自己的数据上微调。<strong>这是「预训练 + 微调」范式的第一次接触，LLM 时代同样的思想</strong>。</p>
<h3>实战</h3>
<p>用预训练 ResNet 在 CIFAR-10 或自选图片集（猫狗分类）上微调，体验小数据也能高精度。</p>`,
        resources: [
          { name: "CS231n 课程笔记（中文翻译）", url: "https://github.com/whyscience/CS231n-Note-Translation_CN" },
          { name: "PyTorch 迁移学习教程", url: "https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html" }
        ]
      },
      {
        id: "s3l4",
        title: "序列模型：RNN 到注意力机制",
        minutes: 120,
        content: `
<p>文本、语音、时间序列是有顺序的数据。这一课是<strong>通往 Transformer 的桥梁</strong>。</p>
<h3>RNN 家族（理解思想即可）</h3>
<ul>
<li>RNN：用隐藏状态传递历史信息；缺陷是梯度消失、难以记住长程依赖</li>
<li>LSTM / GRU：用门控机制缓解遗忘；曾经的 NLP 主流</li>
<li>致命弱点：<strong>必须串行计算，无法并行</strong>，这正是 Transformer 取代它的原因</li>
</ul>
<h3>注意力机制（重点！）</h3>
<ul>
<li>核心思想：输出时<strong>动态地「关注」输入中最相关的部分</strong>，加权求和</li>
<li>Query / Key / Value 三元组：Q 是「我在找什么」，K 是「我有什么标签」，V 是「我的内容」</li>
<li>注意力权重 = softmax(QKᵀ/√d)——这个公式值得手推一遍</li>
</ul>
<p>把注意力机制吃透，下一阶段的 Transformer 就是水到渠成。</p>`,
        resources: [
          { name: "The Illustrated Transformer（图解）", url: "https://jalammar.github.io/illustrated-transformer/" },
          { name: "李宏毅深度学习课程（B站）", url: "https://www.bilibili.com/video/BV1Wv411h7kN" }
        ]
      },
      {
        id: "s3l5",
        title: "实战：训练你的第一个深度模型",
        minutes: 180,
        content: `
<p>第二个作品集项目：端到端深度学习。</p>
<h3>项目建议（按兴趣选）</h3>
<ul>
<li><strong>图像分类</strong>：自建数据集（如垃圾分类、植物识别），用迁移学习达到实用精度</li>
<li><strong>文本分类</strong>：中文情感分析 / 新闻分类（可用预训练 BERT 微调）</li>
<li><strong>时间序列</strong>：销量/电量预测（与原行业结合的好机会）</li>
</ul>
<h3>工程要求</h3>
<ol>
<li>规范的项目结构：data / models / train.py / eval.py / README</li>
<li>实验记录：用 TensorBoard 或 wandb 跟踪 loss 曲线</li>
<li>至少一次「诊断并解决问题」的经历（过拟合？学习率不对？数据有脏？）并写进 README</li>
<li>（加分）用 Gradio 做一个可交互 Demo</li>
</ol>
<p>面试官最爱问：「你遇到过什么问题、怎么解决的」——这个项目就是你的素材库。</p>`,
        resources: [
          { name: "Gradio 快速入门", url: "https://www.gradio.app/guides/quickstart" },
          { name: "Weights & Biases 教程", url: "https://docs.wandb.ai/quickstart" }
        ]
      }
    ]
  },
  {
    id: "s4",
    title: "阶段四 · 大语言模型与生成式 AI",
    subtitle: "Transformer、Prompt、RAG、Agent",
    weeks: "建议 5–7 周",
    desc: "当下行业最热的方向，也是转型者机会最多的领域——应用层不要求深厚的科研背景，工程与产品能力同样重要。",
    lessons: [
      {
        id: "s4l1",
        title: "Transformer 架构精讲",
        minutes: 150,
        content: `
<p>2017 年的论文《Attention Is All You Need》彻底改变了 AI。<strong>GPT、Claude、LLaMA 全部基于 Transformer</strong>。</p>
<h3>架构拆解</h3>
<ul>
<li><strong>自注意力（Self-Attention）</strong>：序列中每个 token 关注所有其他 token，一步捕获任意距离的依赖</li>
<li><strong>多头注意力</strong>：多组 QKV 并行，各自关注不同类型的关系</li>
<li><strong>位置编码</strong>：注意力本身无序，需要注入位置信息（正弦编码 → RoPE）</li>
<li>前馈网络（FFN）、残差连接、LayerNorm：每个 Transformer Block 的标配</li>
</ul>
<h3>两大流派</h3>
<ul>
<li>Encoder 型（BERT）：双向理解，适合分类、检索</li>
<li><strong>Decoder 型（GPT/Claude）</strong>：单向自回归，逐 token 生成——当今 LLM 主流</li>
</ul>
<h3>强烈推荐</h3>
<p>跟着 Karpathy 的「Let's build GPT」视频，<strong>从零手写一个迷你 GPT</strong>。写完你对 LLM 的理解将超过 90% 的从业者。</p>`,
        resources: [
          { name: "Karpathy: Let's build GPT（从零手写）", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY" },
          { name: "The Illustrated GPT-2", url: "https://jalammar.github.io/illustrated-gpt2/" },
          { name: "Attention Is All You Need 原论文", url: "https://arxiv.org/abs/1706.03762" }
        ]
      },
      {
        id: "s4l2",
        title: "LLM 是怎样炼成的",
        minutes: 100,
        content: `
<p>理解 LLM 的训练流程，才能理解它的能力边界与失效模式。</p>
<h3>三阶段训练</h3>
<ol>
<li><strong>预训练</strong>：在海量文本上做「预测下一个 token」。产物是 base 模型——博学但不听话</li>
<li><strong>监督微调（SFT）</strong>：用高质量「指令→回答」对教会模型对话格式</li>
<li><strong>对齐（RLHF / DPO / RLAIF）</strong>：用人类偏好训练模型「有用、诚实、无害」。Anthropic 的 Constitutional AI 是代表性方法</li>
</ol>
<h3>关键概念</h3>
<ul>
<li><strong>Token 与分词器</strong>：模型眼中的世界是 token 序列；中文一个字约 1–2 token</li>
<li><strong>上下文窗口</strong>：模型一次能「看见」的最大 token 数</li>
<li><strong>温度与采样</strong>：temperature、top-p 控制输出随机性</li>
<li><strong>幻觉</strong>：模型本质是概率生成，会一本正经地编造——理解成因才能设计缓解方案（RAG、引用、校验）</li>
<li>Scaling Laws：模型能力随参数/数据/算力可预测地增长</li>
</ul>`,
        resources: [
          { name: "Karpathy: Intro to Large Language Models", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g" },
          { name: "State of GPT (Karpathy)", url: "https://www.youtube.com/watch?v=bZQun8Y4L2A" }
        ]
      },
      {
        id: "s4l3",
        title: "Prompt 工程与 API 开发",
        minutes: 120,
        content: `
<p>Prompt 工程不是「咒语集邮」，而是<strong>把模糊需求翻译成模型可执行规格</strong>的工程能力。</p>
<h3>核心技巧</h3>
<ul>
<li><strong>明确角色与任务</strong>：系统提示词定义身份、目标、约束、输出格式</li>
<li><strong>少样本示例（Few-shot）</strong>：给 2–3 个输入输出示例，效果常胜过千言万语</li>
<li><strong>思维链（CoT）</strong>：让模型「一步步思考」提升推理质量（现代模型已内置推理能力）</li>
<li><strong>结构化输出</strong>：要求 JSON / XML 输出便于程序处理</li>
<li>拆解复杂任务：链式调用，每步只做一件事</li>
</ul>
<h3>API 开发必会</h3>
<ul>
<li>调用 Claude / OpenAI API：消息格式、system prompt、流式输出</li>
<li>参数：max_tokens、temperature、停止条件</li>
<li>工程问题：重试与限流、成本核算（按 token 计费）、prompt 缓存</li>
</ul>
<p>本应用的「AI 导师」页就是一个浏览器直连 Claude API 的最小实现，可以读源码学习。</p>`,
        resources: [
          { name: "Anthropic Prompt 工程文档", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview" },
          { name: "Anthropic API 文档", url: "https://platform.claude.com/docs/en/get-started" },
          { name: "Prompt Engineering Guide（中文）", url: "https://www.promptingguide.ai/zh" }
        ]
      },
      {
        id: "s4l4",
        title: "RAG：检索增强生成",
        minutes: 130,
        content: `
<p>RAG 解决 LLM 两大痛点：<strong>知识过时</strong>与<strong>私有数据不可知</strong>。它是目前企业落地最多的 LLM 应用形态。</p>
<h3>核心流程</h3>
<ol>
<li><strong>索引</strong>：文档切块（chunking）→ 用 Embedding 模型转成向量 → 存入向量数据库</li>
<li><strong>检索</strong>：用户问题转向量 → 相似度搜索 top-k 相关片段</li>
<li><strong>生成</strong>：把检索结果拼进 prompt，让 LLM 基于资料回答</li>
</ol>
<h3>关键技术点</h3>
<ul>
<li><strong>Embedding</strong>：把文本映射为语义向量，余弦相似度衡量相关性</li>
<li>向量数据库：Chroma（入门）、FAISS、Milvus、pgvector</li>
<li>切块策略：大小、重叠、按结构切分——对效果影响巨大</li>
<li>进阶：混合检索（关键词+向量）、重排序（rerank）、查询改写</li>
<li>评估：检索命中率、答案忠实度（faithfulness）</li>
</ul>
<h3>实战</h3>
<p>做一个「与你的 PDF 对话」应用：LangChain 或 LlamaIndex + Chroma + 任意 LLM API。这是作品集的黄金项目。</p>`,
        resources: [
          { name: "LangChain RAG 教程", url: "https://python.langchain.com/docs/tutorials/rag/" },
          { name: "LlamaIndex 入门", url: "https://docs.llamaindex.ai/en/stable/" }
        ]
      },
      {
        id: "s4l5",
        title: "微调与开源模型",
        minutes: 120,
        content: `
<p>什么时候用微调？<strong>当 prompt 和 RAG 都解决不了的时候</strong>：固定风格/格式、领域术语、特定任务的稳定行为。</p>
<h3>决策顺序（重要）</h3>
<p>Prompt 工程 → Few-shot → RAG → 微调。微调成本最高、迭代最慢，永远最后考虑。</p>
<h3>高效微调技术</h3>
<ul>
<li><strong>LoRA / QLoRA</strong>：冻结原模型，只训练低秩适配矩阵——消费级显卡也能微调 7B 模型</li>
<li>全参微调 vs PEFT：理解显存开销差异</li>
<li>数据质量 >> 数据数量：几百条高质量样本常胜过几万条噪声数据</li>
</ul>
<h3>开源生态</h3>
<ul>
<li>Hugging Face：模型仓库、transformers / peft / trl 库</li>
<li>主流开源模型：LLaMA、Qwen（通义千问）、DeepSeek、Mistral</li>
<li>本地推理：Ollama（一行命令跑本地模型）、vLLM（生产级推理服务）</li>
</ul>
<h3>实战</h3>
<p>用 Ollama 在本地跑一个 7B 模型；（进阶）用 QLoRA 在自己的数据集上微调一次，体验完整流程。</p>`,
        resources: [
          { name: "Hugging Face NLP 课程", url: "https://huggingface.co/learn/nlp-course/zh-CN/chapter1/1" },
          { name: "Ollama 官网", url: "https://ollama.com/" },
          { name: "LoRA 论文解读", url: "https://huggingface.co/docs/peft/conceptual_guides/lora" }
        ]
      },
      {
        id: "s4l6",
        title: "AI Agent 与工具调用",
        minutes: 130,
        content: `
<p>Agent = <strong>让 LLM 拥有「手脚」</strong>：感知环境 → 推理规划 → 调用工具 → 观察结果 → 循环，直到完成任务。这是当前最前沿也最有想象力的方向。</p>
<h3>核心机制：工具调用（Tool Use）</h3>
<ol>
<li>开发者声明工具：名称 + 描述 + 参数 JSON Schema</li>
<li>模型决定调用哪个工具、传什么参数</li>
<li>你的代码执行工具，把结果喂回模型</li>
<li>循环往复，直到模型给出最终答案（agentic loop）</li>
</ol>
<h3>关键概念</h3>
<ul>
<li>ReAct 模式：Reasoning + Acting 交替</li>
<li><strong>MCP（Model Context Protocol）</strong>：Anthropic 推出的工具连接开放标准，生态发展迅速</li>
<li>多 Agent 协作、规划与反思、记忆机制（短期上下文 + 长期存储）</li>
<li>安全与边界：权限控制、人工确认、沙箱执行</li>
</ul>
<h3>实战</h3>
<p>不用框架，<strong>纯 API 手写一个 agentic loop</strong>（天气查询 / 计算器 / 文件操作三个工具），再尝试 Claude Agent SDK 或 LangGraph。理解了循环本质，框架只是封装。</p>`,
        resources: [
          { name: "Anthropic: Building Effective Agents", url: "https://www.anthropic.com/research/building-effective-agents" },
          { name: "MCP 官方文档", url: "https://modelcontextprotocol.io/" },
          { name: "Claude 工具调用文档", url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" }
        ]
      }
    ]
  },
  {
    id: "s5",
    title: "阶段五 · 工程化与项目实战",
    subtitle: "从 Demo 到生产",
    weeks: "建议 3–5 周",
    desc: "会训模型只是起点，能把模型变成稳定服务才是企业付薪水的理由。工程能力是转型者与应届生竞争的护城河。",
    lessons: [
      {
        id: "s5l1",
        title: "开发者基本功",
        minutes: 100,
        content: `
<p>AI 工程师首先是工程师。这些技能不分方向，缺一不可。</p>
<h3>Git 与协作</h3>
<ul>
<li>日常流：clone / branch / commit / push / Pull Request / code review</li>
<li>会解决合并冲突；commit message 写得让人看懂</li>
</ul>
<h3>Linux 与命令行</h3>
<ul>
<li>文件操作、ssh 远程、screen/tmux 后台训练、查看 GPU（nvidia-smi）</li>
<li>shell 管道与 grep/awk 基本用法</li>
</ul>
<h3>工程素养</h3>
<ul>
<li>虚拟环境与依赖管理（venv / conda / uv + requirements.txt）</li>
<li>代码规范：类型注解、docstring、模块化拆分</li>
<li>基本测试意识：pytest 写单元测试</li>
<li>Docker 入门：能写 Dockerfile 把应用容器化</li>
</ul>`,
        resources: [
          { name: "Git 交互式教程 Learn Git Branching", url: "https://learngitbranching.js.org/?locale=zh_CN" },
          { name: "MIT The Missing Semester（中文）", url: "https://missing-semester-cn.github.io/" },
          { name: "Docker 官方入门", url: "https://docs.docker.com/get-started/" }
        ]
      },
      {
        id: "s5l2",
        title: "模型服务与部署",
        minutes: 120,
        content: `
<p>把模型从 notebook 搬到能被调用的服务。</p>
<h3>API 服务化</h3>
<ul>
<li><strong>FastAPI</strong>：Python 生态首选。路由、请求校验（Pydantic）、异步、自动文档</li>
<li>把一个 sklearn/PyTorch 模型包成 REST API：加载模型 → 预处理 → 推理 → 返回 JSON</li>
<li>流式响应（SSE）：LLM 应用的标配体验</li>
</ul>
<h3>部署路径</h3>
<ul>
<li>快速 Demo：Gradio / Streamlit + Hugging Face Spaces（免费）</li>
<li>正式服务：Docker 镜像 → 云服务器 / Serverless</li>
<li>LLM 推理：vLLM / TGI 部署开源模型，理解吞吐与延迟的权衡</li>
</ul>
<h3>性能优化概念</h3>
<p>批处理（batching）、模型量化（INT8/INT4）、KV Cache、并发与队列。面试聊到部署时这些词要能展开。</p>`,
        resources: [
          { name: "FastAPI 官方教程（中文）", url: "https://fastapi.tiangolo.com/zh/tutorial/" },
          { name: "Hugging Face Spaces", url: "https://huggingface.co/spaces" },
          { name: "vLLM 文档", url: "https://docs.vllm.ai/" }
        ]
      },
      {
        id: "s5l3",
        title: "MLOps 与 LLMOps 概览",
        minutes: 90,
        content: `
<p>模型上线只是开始：数据会漂移、效果会衰减、成本会失控。MLOps 就是让 AI 系统<strong>可持续运转</strong>的实践集合。</p>
<h3>MLOps 核心环节</h3>
<ul>
<li>实验跟踪：MLflow / wandb 记录每次实验的参数与指标</li>
<li>数据与模型版本管理：DVC、模型注册表</li>
<li>CI/CD：自动化测试与发布流水线</li>
<li>监控：性能指标、数据漂移检测、告警</li>
</ul>
<h3>LLMOps 特有问题</h3>
<ul>
<li><strong>评估（Evals）</strong>：LLM 输出没有唯一正确答案——构建评估集、LLM-as-judge、人工抽检</li>
<li>Prompt 版本管理与 A/B 测试</li>
<li>成本与延迟监控：token 用量仪表盘</li>
<li>安全：prompt 注入防护、敏感信息过滤、输出审核</li>
</ul>
<p>转型者不需要精通全部工具，但要<strong>能画出一张完整的 ML 系统生命周期图</strong>并讲清每个环节的作用。</p>`,
        resources: [
          { name: "MLflow 快速入门", url: "https://mlflow.org/docs/latest/getting-started/" },
          { name: "Chip Huyen: Designing ML Systems 笔记", url: "https://github.com/chiphuyen/dmls-book" }
        ]
      },
      {
        id: "s5l4",
        title: "毕业项目：端到端 AI 应用",
        minutes: 240,
        content: `
<p>作品集的压舱石：一个<strong>解决真实问题、可在线访问</strong>的完整 AI 应用。</p>
<h3>选题原则</h3>
<ul>
<li>与你的原行业结合（法律文书助手、医美咨询 bot、外贸邮件生成器……）——这是转型者最大的差异化优势</li>
<li>宁小勿大：一个打磨完整的小应用 > 三个半成品</li>
</ul>
<h3>建议技术栈</h3>
<p>FastAPI 后端 + LLM API（或本地 Ollama）+ RAG（私有知识库）+ 简单前端（Gradio/Streamlit 或本项目这样的静态页）+ Docker 部署。</p>
<h3>验收清单</h3>
<ol>
<li>线上可访问的 Demo 链接</li>
<li>GitHub 仓库：清晰 README（含架构图）、规范的代码结构</li>
<li>一篇技术复盘文章：为什么这样设计、踩了什么坑、效果如何评估</li>
<li>（强烈加分）记录真实用户的使用反馈与迭代</li>
</ol>
<p>完成这一课，你的简历已经具备了和科班候选人同台竞技的资本。</p>`,
        resources: [
          { name: "Streamlit 文档", url: "https://docs.streamlit.io/" },
          { name: "免费部署平台 Render", url: "https://render.com/" }
        ]
      }
    ]
  },
  {
    id: "s6",
    title: "阶段六 · 求职与转型",
    subtitle: "岗位选择、简历、面试",
    weeks: "建议 2–4 周（与前面并行）",
    desc: "学习的终点是拿到 offer。了解岗位地图、把经历翻译成 AI 语言、系统准备面试。",
    lessons: [
      {
        id: "s6l1",
        title: "AI 岗位地图与定位",
        minutes: 80,
        content: `
<p>「转行做 AI」太模糊，先选准赛道。</p>
<h3>主流岗位与门槛</h3>
<ul>
<li><strong>AI 应用工程师 / LLM 应用开发</strong>：⭐ 转型者首选。用 API、RAG、Agent 构建产品，重工程轻科研，需求爆发中</li>
<li><strong>数据分析师 → 数据科学家</strong>：⭐ 平滑路径。SQL + 统计 + 业务理解，有业务背景者优势大</li>
<li><strong>机器学习工程师</strong>：训练与部署模型，要求扎实的 ML + 工程能力</li>
<li><strong>AI 产品经理</strong>：懂技术边界的 PM 极稀缺，适合产品/运营背景转型</li>
<li><strong>数据工程师</strong>：数据管道与基础设施，稳定刚需</li>
<li>算法研究员：通常要求硕博 + 论文，转型者不建议硬碰</li>
</ul>
<h3>定位方法</h3>
<p>原行业知识 × AI 技能 = 你的独特位置。医疗→医疗 AI，金融→风控建模，教育→AI 教育产品。<strong>在垂直领域，你的领域知识 + 及格的 AI 技能，胜过纯技术背景的竞争者</strong>。</p>`,
        resources: [
          { name: "Levels.fyi 岗位薪资参考", url: "https://www.levels.fyi/" }
        ]
      },
      {
        id: "s6l2",
        title: "简历与作品集打造",
        minutes: 90,
        content: `
<p>转型者简历的核心任务：<strong>让招聘方在 30 秒内相信你能干这个活</strong>。</p>
<h3>简历原则</h3>
<ul>
<li>技能与项目前置，教育与原职业经历精简</li>
<li>每条经历用「动词 + 技术 + 量化结果」：「用 RAG + 重排序把检索命中率从 62% 提升到 88%」</li>
<li>把原行业经历翻译成 AI 价值：「8 年财务经验」→「深谙财务流程，主导过财务数据口径治理，可快速定义风控建模特征」</li>
<li>诚实：没做过的不写，写了的能被任意深挖</li>
</ul>
<h3>作品集清单（前面阶段已完成）</h3>
<ol>
<li>经典 ML 项目（阶段二）：展示基本功</li>
<li>深度学习项目（阶段三）：展示训练与调优能力</li>
<li><strong>端到端 LLM 应用（阶段五）：展示工程落地能力，放最前面</strong></li>
</ol>
<h3>线上形象</h3>
<p>GitHub 绿格子 + 置顶项目 + 每个项目像样的 README；（加分）技术博客 3–5 篇，写你踩坑与解决的过程。</p>`,
        resources: [
          { name: "GitHub Profile 美化指南", url: "https://github.com/abhisheknaiidu/awesome-github-profile-readme" }
        ]
      },
      {
        id: "s6l3",
        title: "面试系统准备",
        minutes: 120,
        content: `
<p>AI 岗位面试四大板块，按目标岗位分配精力。</p>
<h3>① 机器学习基础（必考）</h3>
<p>过拟合、偏差方差、正则化、评估指标、经典算法原理。本应用「面试题库」覆盖高频题，配合闪卡反复巩固。</p>
<h3>② 编程与算法</h3>
<p>LeetCode 中等难度 100–150 题（数组、哈希、双指针、二叉树、动态规划基础）；SQL 多表查询与窗口函数（数据岗必考）。</p>
<h3>③ 项目深挖（决胜局）</h3>
<p>你的每个项目都会被问：为什么这样设计？数据怎么处理？指标为什么选这个？效果不好怎么排查？<strong>提前用 STAR 法写好每个项目的「剧本」</strong>，找朋友模拟拷打。</p>
<h3>④ 系统/场景设计（中高级）</h3>
<p>「设计一个智能客服系统」「如何评估 RAG 效果」——考察架构思维。练习画图：数据流、组件选型、评估闭环、成本估算。</p>
<h3>行为面试</h3>
<p>必答题「你为什么转行」：用真诚的故事线讲清动机 + 已付出的行动 + 原行业带来的独特价值。</p>`,
        resources: [
          { name: "LeetCode 中国", url: "https://leetcode.cn/" },
          { name: "Machine Learning Interviews Book", url: "https://huyenchip.com/ml-interviews-book/" }
        ]
      },
      {
        id: "s6l4",
        title: "求职执行与持续成长",
        minutes: 80,
        content: `
<p>最后一公里：把准备转化为 offer，并保持长期竞争力。</p>
<h3>求职策略</h3>
<ul>
<li>渠道优先级：内推 > 猎头 > 直投。主动在技术社区/线下活动建立连接</li>
<li>降低首份 AI 工作的门槛预期：中小公司、AI 边缘岗位（数据、测试、运营中台）都是跳板，<strong>先上车再换座</strong></li>
<li>投递节奏：每周固定投递量 + 复盘拒信原因，把面试当免费的弱点诊断</li>
<li>考虑过渡形态：内部转岗（最容易）、接外包项目、开源贡献攒履历</li>
</ul>
<h3>持续学习系统</h3>
<ul>
<li>信息源：关注 Anthropic / OpenAI 官方博客、Hugging Face、机器之心、papers with code</li>
<li>每月精读 1 篇重要论文或技术报告；每季度做一个小实验项目</li>
<li>输出倒逼输入：写博客、做分享，教是最好的学</li>
</ul>
<h3>心态</h3>
<p>AI 领域变化极快——这对转型者是<strong>好消息</strong>：所有人都在持续追新，你与科班者的差距每个月都在缩小。坚持 6–12 个月的系统投入，转型完全可行。</p>`,
        resources: [
          { name: "Anthropic 官方博客", url: "https://www.anthropic.com/news" },
          { name: "Hugging Face 博客", url: "https://huggingface.co/blog/zh" }
        ]
      }
    ]
  }
];

/* ---------------- 测验题库（按阶段） ---------------- */
const QUIZZES = {
  s1: [
    { q: "NumPy 中「广播（Broadcasting）」机制的作用是？", options: ["把数组发送到多台机器并行计算", "让不同形状的数组按规则自动扩展后进行运算", "把 Python 列表转换成 ndarray", "压缩数组以节省内存"], answer: 1, explain: "广播允许形状兼容的数组（如 (3,4) 和 (4,)）自动扩展维度后逐元素运算，是向量化代码的核心机制。" },
    { q: "矩阵乘法 y = Wx 中，若 W 形状为 (10, 5)，x 形状为 (5,)，则 y 的形状是？", options: ["(5,)", "(10,)", "(5, 10)", "(10, 5)"], answer: 1, explain: "(10,5) × (5,) → (10,)。神经网络一层就是把 5 维输入线性变换为 10 维输出。" },
    { q: "两个向量的余弦相似度接近 1 意味着？", options: ["两向量长度几乎相等", "两向量方向几乎一致", "两向量互相垂直", "两向量元素全为正数"], answer: 1, explain: "余弦相似度衡量方向夹角，与长度无关。embedding 检索正是用它衡量语义相近程度。" },
    { q: "链式法则在深度学习中的核心用途是？", options: ["加速矩阵乘法", "实现反向传播逐层计算梯度", "防止过拟合", "初始化网络权重"], answer: 1, explain: "反向传播本质上就是链式法则的系统化应用：从损失函数出发，逐层求出每个参数的偏导数。" },
    { q: "最大似然估计（MLE）的思想是？", options: ["找让损失函数最大的参数", "找让观测数据出现概率最大的参数", "找方差最小的无偏估计", "随机采样多个参数取平均"], answer: 1, explain: "MLE 选择使观测数据似然（出现概率）最大的参数，许多损失函数（如交叉熵）都可由 MLE 推导出来。" }
  ],
  s2: [
    { q: "以下哪个属于无监督学习任务？", options: ["垃圾邮件分类", "房价预测", "用户分群聚类", "手写数字识别"], answer: 2, explain: "聚类没有标注答案，由算法自行发现数据结构，属于无监督学习；其余三项都需要标签。" },
    { q: "模型在训练集上准确率 99%，在测试集上只有 70%，最可能的问题是？", options: ["欠拟合", "过拟合", "学习率太小", "数据量太大"], answer: 1, explain: "训练好、测试差是典型的过拟合（模型「背题」了）。对策：正则化、更多数据、降低模型复杂度、早停等。" },
    { q: "癌症初筛模型最应优先保证哪个指标？", options: ["精确率 Precision", "召回率 Recall", "准确率 Accuracy", "推理速度"], answer: 1, explain: "漏诊（假阴性）代价远高于误报，所以要高召回——宁可多查，不可漏掉真正的患者。" },
    { q: "为什么测试集「只能用一次」？", options: ["测试数据会过期", "反复用测试集调参等于把信息泄露给模型，评估失去意义", "测试集通常太小", "法律法规要求"], answer: 1, explain: "如果根据测试集表现反复调整模型，模型就间接「见过」测试集，最终评估会虚高。调参应使用验证集/交叉验证。" },
    { q: "对类别特征「城市 ∈ {北京, 上海, 广州}」做 One-Hot 编码的结果是？", options: ["映射为 1、2、3", "扩展为 3 个 0/1 列", "计算每个城市的平均房价", "删除该特征"], answer: 1, explain: "One-Hot 把每个类别变成独立的 0/1 列，避免引入「北京 < 上海 < 广州」这种虚假的大小关系。" },
    { q: "XGBoost / LightGBM 这类梯度提升树最擅长的数据类型是？", options: ["图像", "音频", "结构化表格数据", "视频"], answer: 2, explain: "树模型在表格数据上常胜过深度学习且训练成本低，是工业界表格任务（风控、推荐特征）的主力。" }
  ],
  s3: [
    { q: "神经网络中激活函数的核心作用是？", options: ["加快训练速度", "引入非线性，使网络能拟合复杂函数", "减少参数数量", "防止梯度爆炸"], answer: 1, explain: "没有非线性激活，多层线性变换叠加仍是线性变换。ReLU、GELU 等激活让网络获得表达复杂函数的能力。" },
    { q: "PyTorch 训练循环中 optimizer.zero_grad() 的作用是？", options: ["重置模型权重", "清空上一步累积的梯度", "把学习率归零", "删除计算图"], answer: 1, explain: "PyTorch 默认梯度累加。每次 backward 前需清零，否则梯度会叠加导致更新错误。" },
    { q: "ResNet 解决深层网络难训练的核心创新是？", options: ["更大的卷积核", "残差连接（skip connection）", "去掉激活函数", "使用更多池化层"], answer: 1, explain: "残差连接让梯度可以「抄近路」直接回传，缓解梯度消失，使训练上百层网络成为可能。该思想被 Transformer 沿用。" },
    { q: "迁移学习的典型做法是？", options: ["从零开始训练全部参数", "加载预训练模型，替换输出层后在新数据上微调", "把两个模型的输出取平均", "把训练集复制多份"], answer: 1, explain: "预训练模型已学到通用特征，只需少量数据微调即可适配新任务——「预训练+微调」范式贯穿 CV 与 NLP。" },
    { q: "注意力机制中 Q、K、V 的直观含义是？", options: ["三种不同的损失函数", "查询（找什么）、键（有什么标签）、值（实际内容）", "三个并行的网络层", "学习率的三个阶段"], answer: 1, explain: "用 Q 与各 K 的相似度计算注意力权重，再对 V 加权求和——即「按相关性聚合信息」。" },
    { q: "RNN 被 Transformer 取代的最关键原因是？", options: ["RNN 参数太多", "RNN 必须串行计算、无法并行，且长程依赖难捕捉", "RNN 不能处理中文", "RNN 不支持 GPU"], answer: 1, explain: "RNN 按时间步串行处理，训练慢且远距离信息易丢失；自注意力一步连接任意位置且可全并行。" }
  ],
  s4: [
    { q: "GPT / Claude 这类生成式 LLM 属于哪种 Transformer 结构？", options: ["Encoder-only", "Decoder-only（自回归）", "Encoder-Decoder", "纯 CNN"], answer: 1, explain: "它们是 Decoder-only 自回归模型：根据已有 token 逐个预测下一个 token。BERT 才是 Encoder-only。" },
    { q: "LLM 训练三阶段的正确顺序是？", options: ["对齐 → 预训练 → SFT", "预训练 → 监督微调(SFT) → 对齐(RLHF/DPO)", "SFT → 预训练 → 对齐", "预训练 → 对齐 → SFT"], answer: 1, explain: "先在海量文本预训练学知识，再用指令数据 SFT 学对话格式，最后用人类偏好对齐行为。" },
    { q: "RAG 相比直接微调的主要优势是？", options: ["完全不需要 LLM", "知识可随时更新、可溯源，且无需训练成本", "推理速度一定更快", "不需要任何数据准备"], answer: 1, explain: "RAG 把知识放在外部库中，更新只需重建索引；回答可附引用来源。微调更新知识则需重新训练。" },
    { q: "RAG 系统中 Embedding 的作用是？", options: ["压缩模型体积", "把文本映射为语义向量以便相似度检索", "给文本加密", "生成最终答案"], answer: 1, explain: "Embedding 模型把问题和文档块都转为向量，通过余弦相似度找出语义最相关的片段供 LLM 参考。" },
    { q: "解决「让模型输出固定 JSON 格式」的首选手段顺序应该是？", options: ["直接微调", "Prompt/结构化输出功能 → 不行再考虑微调", "重新预训练", "换更大的模型"], answer: 1, explain: "成本从低到高：先用 prompt 与 API 的结构化输出（JSON Schema）能力，绝大多数场景已足够；微调是最后手段。" },
    { q: "Agent 的「工具调用循环」中，工具实际由谁执行？", options: ["模型在云端自动执行", "开发者的代码执行后把结果回传给模型", "用户手动执行", "操作系统内核执行"], answer: 1, explain: "模型只输出「想调用什么工具+参数」，真正执行的是你的代码（或托管运行时），结果作为 tool_result 喂回模型继续推理。" },
    { q: "LoRA 微调高效的原因是？", options: ["删除了模型一半的层", "冻结原参数，只训练小的低秩适配矩阵", "把模型转成 INT4", "使用更小的训练集"], answer: 1, explain: "LoRA 在原权重旁加一对低秩矩阵 A·B，只训练这部分（通常 <1% 参数量），大幅降低显存与训练成本。" }
  ],
  s5: [
    { q: "FastAPI 中用什么来做请求体的数据校验？", options: ["正则表达式", "Pydantic 模型", "SQL 约束", "手写 if 判断"], answer: 1, explain: "FastAPI 与 Pydantic 深度集成：声明数据模型即可自动完成解析、校验与 API 文档生成。" },
    { q: "LLM 聊天应用普遍使用 SSE 流式输出的原因是？", options: ["节省服务器内存", "让用户尽早看到逐字输出，显著改善体验", "提高模型准确率", "绕过 token 计费"], answer: 1, explain: "长回答可能要数十秒，流式逐 token 返回让首字延迟降到 1 秒内，体验差异巨大。" },
    { q: "模型量化（如 INT8/INT4）的主要收益是？", options: ["提升模型准确率", "降低显存占用、加快推理速度", "增加上下文窗口", "防止 prompt 注入"], answer: 1, explain: "把权重从 FP16 压到低比特，显存减半甚至更多、速度更快，代价是轻微精度损失——部署端常用手段。" },
    { q: "「数据漂移（Data Drift）」指的是？", options: ["数据库磁盘损坏", "线上数据分布随时间偏离训练数据分布，导致模型效果衰减", "数据被黑客篡改", "标签打错了"], answer: 1, explain: "用户行为、市场环境变化都会让输入分布漂移。需要监控 + 定期重训，这正是 MLOps 存在的理由。" },
    { q: "评估 LLM 应用输出质量的常用方法不包括？", options: ["构建评估数据集定期回归", "LLM-as-judge 自动打分", "人工抽样评审", "只看服务器 CPU 占用率"], answer: 3, explain: "CPU 占用是资源指标，与输出质量无关。质量评估需要评估集 + 自动评分 + 人工校验的组合。" }
  ],
  s6: [
    { q: "对多数转型者来说，当前最容易切入的 AI 岗位是？", options: ["算法研究员", "LLM 应用开发 / AI 应用工程师", "AI 芯片设计", "自动驾驶感知算法"], answer: 1, explain: "LLM 应用开发重工程与产品能力、轻科研门槛，行业需求爆发，最适合作为转型切入点。研究员通常要求硕博与论文。" },
    { q: "转型者简历中，原行业经历的正确处理方式是？", options: ["完全删除避免暴露", "原样罗列所有职责", "翻译成对 AI 岗位的独特价值（领域知识、数据理解）", "放在第一页最显眼处"], answer: 2, explain: "领域知识 × AI 技能是转型者的差异化武器。把财务/医疗/运营经验翻译成「我懂这个领域的数据与业务」。" },
    { q: "面试中「项目深挖」环节最重要的准备是？", options: ["背更多名词解释", "用 STAR 法为每个项目准备可被层层追问的完整剧本", "准备 PPT", "把项目代码打印出来"], answer: 1, explain: "面试官会追问设计动机、数据处理、失败排查。提前写好每个项目的剧本并模拟拷打，是性价比最高的准备。" },
    { q: "「先上车再换座」策略的含义是？", options: ["先买车代步再考虑工作", "接受中小公司或 AI 边缘岗位作为跳板，积累真实经验后再升级", "同时入职两家公司", "先做管理岗再转技术"], answer: 1, explain: "首份 AI 工作的目的是获得真实生产经验与行业身份，门槛预期适当放低，一两年后跳槽空间会完全不同。" }
  ]
};

/* ---------------- 闪卡（间隔重复） ---------------- */
const FLASHCARDS = [
  { id: "f1", tag: "ML", front: "过拟合 (Overfitting)", back: "模型把训练数据「背」下来（含噪声），训练误差低但泛化差。对策：正则化、更多数据、Dropout、早停、降低模型复杂度。" },
  { id: "f2", tag: "ML", front: "偏差-方差权衡", back: "偏差高=欠拟合（模型太简单），方差高=过拟合（对数据太敏感）。模型复杂度需要在两者间取平衡。" },
  { id: "f3", tag: "ML", front: "精确率 vs 召回率", back: "精确率=预测为正的里有多少真的正（查准）；召回率=真的正里有多少被找到（查全）。F1 是两者调和平均。" },
  { id: "f4", tag: "ML", front: "交叉验证 (Cross-Validation)", back: "把训练数据分成 K 折，轮流用 K-1 折训练、1 折验证，取平均。让评估更稳健、充分利用数据。" },
  { id: "f5", tag: "ML", front: "正则化 (L1/L2)", back: "在损失中加入参数惩罚项抑制过拟合。L1（Lasso）促使参数稀疏可做特征选择；L2（Ridge）让参数整体变小更平滑。" },
  { id: "f6", tag: "ML", front: "梯度下降", back: "沿损失函数梯度的反方向小步更新参数：θ = θ − lr·∇L。学习率太大震荡发散，太小收敛慢。" },
  { id: "f7", tag: "DL", front: "反向传播", back: "利用链式法则从输出层向输入层逐层计算损失对每个参数的梯度，是神经网络训练的核心算法。" },
  { id: "f8", tag: "DL", front: "激活函数的作用", back: "引入非线性。没有它，多层网络等价于一层线性变换。常用：ReLU（主流）、GELU（Transformer）、Sigmoid（输出概率）。" },
  { id: "f9", tag: "DL", front: "Batch Normalization", back: "对每个 mini-batch 的中间激活做标准化，稳定分布、加速收敛、轻微正则化效果。Transformer 中常用 LayerNorm 替代。" },
  { id: "f10", tag: "DL", front: "残差连接 (Residual)", back: "输出 = F(x) + x。让梯度可直接回传、网络只需学习「增量」，使超深网络可训练。ResNet 提出，Transformer 标配。" },
  { id: "f11", tag: "DL", front: "Dropout", back: "训练时随机丢弃一部分神经元，迫使网络不依赖个别特征，等效于集成多个子网络，抑制过拟合。推理时关闭。" },
  { id: "f12", tag: "DL", front: "学习率调度", back: "训练中动态调整学习率：warmup 起步避免初期震荡，余弦/阶梯衰减后期精细收敛。是稳定训练大模型的关键技巧。" },
  { id: "f13", tag: "LLM", front: "自注意力 (Self-Attention)", back: "序列中每个 token 通过 Q·K 相似度对所有 token 计算权重，再加权聚合 V。一步建立任意距离依赖，且可全并行。" },
  { id: "f14", tag: "LLM", front: "Token / 分词器", back: "模型处理的最小文本单元。BPE 等算法把文本切成子词。中文约 1–2 token/字。计费、上下文长度都按 token 计。" },
  { id: "f15", tag: "LLM", front: "温度 (Temperature)", back: "控制采样随机性：低温→分布更尖锐、输出更确定；高温→更随机有创造性。注：最新一代模型部分已移除该参数。" },
  { id: "f16", tag: "LLM", front: "幻觉 (Hallucination)", back: "LLM 一本正经地生成与事实不符的内容。根源：模型是概率生成而非数据库查询。缓解：RAG、引用溯源、输出校验、降低开放性。" },
  { id: "f17", tag: "LLM", front: "RLHF", back: "基于人类反馈的强化学习：人类对回答排序→训练奖励模型→用 RL 优化语言模型。让模型从「会说」到「说得有用且无害」。" },
  { id: "f18", tag: "LLM", front: "上下文窗口", back: "模型一次能处理的最大 token 数（输入+输出）。超出需截断、摘要或压缩（compaction）。现代模型已达百万级。" },
  { id: "f19", tag: "LLM", front: "Embedding", back: "把文本映射为高维语义向量，语义相近→向量相近（余弦相似度）。是检索、聚类、推荐、RAG 的基础设施。" },
  { id: "f20", tag: "LLM", front: "RAG 三步流程", back: "①索引：文档切块→向量化→入库；②检索：问题向量化→相似度搜 top-k；③生成：检索结果拼入 prompt 让 LLM 作答。" },
  { id: "f21", tag: "LLM", front: "LoRA", back: "冻结原模型权重，只训练注入的低秩矩阵对（<1% 参数），大幅降低微调的显存与成本。QLoRA 再加 4-bit 量化。" },
  { id: "f22", tag: "LLM", front: "Few-shot 提示", back: "在 prompt 中给出若干输入→输出示例，让模型模仿格式与风格。常比冗长的文字描述更有效。" },
  { id: "f23", tag: "Agent", front: "工具调用 (Tool Use)", back: "声明工具(名称+描述+JSON Schema)→模型决定调用与参数→你的代码执行→结果回传→模型继续。循环至完成即 agentic loop。" },
  { id: "f24", tag: "Agent", front: "MCP", back: "Model Context Protocol，Anthropic 推出的开放标准，统一 AI 应用连接外部工具与数据源的方式，类比「AI 的 USB-C 接口」。" },
  { id: "f25", tag: "Agent", front: "ReAct 模式", back: "Reasoning + Acting：模型交替进行推理（思考下一步）与行动（调用工具），观察结果后继续推理，直到任务完成。" },
  { id: "f26", tag: "工程", front: "模型量化", back: "把权重从 FP16/FP32 压缩到 INT8/INT4，显存大降、推理提速，轻微精度损失。本地部署与端侧推理的关键技术。" },
  { id: "f27", tag: "工程", front: "KV Cache", back: "自回归生成时缓存历史 token 的 Key/Value，避免每步重复计算整个序列的注意力，是 LLM 推理加速的基础优化。" },
  { id: "f28", tag: "工程", front: "数据漂移", back: "线上数据分布随时间偏离训练分布，模型效果悄悄衰减。需要监控分布变化、设置告警、定期重训。" },
  { id: "f29", tag: "工程", front: "Prompt 注入", back: "攻击者在输入中夹带指令试图劫持模型行为（如「忽略以上指令」）。防护：输入隔离标记、权限最小化、输出过滤、人工确认高危操作。" },
  { id: "f30", tag: "工程", front: "LLM-as-Judge", back: "用一个 LLM 给另一个 LLM 的输出打分，实现自动化质量评估。需用人工标注校准评分器，警惕评分偏差。" }
];

/* ---------------- 面试题库 ---------------- */
const INTERVIEW_QA = [
  { cat: "机器学习", q: "如何判断并处理过拟合？", a: "判断：训练误差远低于验证误差；学习曲线两线分叉。处理：①增加数据/数据增强；②正则化（L1/L2、Dropout）；③降低模型复杂度；④早停；⑤交叉验证选模型；⑥集成方法。回答时最好结合自己项目中真实遇到的案例。" },
  { cat: "机器学习", q: "精确率和召回率的区别？什么场景优先哪个？", a: "精确率=TP/(TP+FP)，查准；召回率=TP/(TP+FN)，查全。高召回优先：癌症筛查、风控初筛（漏掉代价大）。高精确优先：垃圾邮件、推送（误报伤体验）。F1 兼顾两者；实际应结合业务代价定阈值。" },
  { cat: "机器学习", q: "为什么需要划分训练集/验证集/测试集？", a: "训练集拟合参数；验证集选超参与模型（可反复用）；测试集只在最后用一次，模拟真实泛化能力。若用测试集调参，信息泄露会让评估虚高。数据少时用 K 折交叉验证替代固定验证集。" },
  { cat: "机器学习", q: "树模型（XGBoost）和神经网络如何选择？", a: "表格/结构化数据：优先梯度提升树——效果好、训练快、可解释、对特征缩放不敏感。图像/文本/语音等非结构化数据：神经网络。数据量小（几千条）几乎总是树模型。回答出「按数据形态选择」即显成熟。" },
  { cat: "深度学习", q: "讲讲反向传播的原理。", a: "前向计算得到损失后，利用链式法则从输出端逐层向前计算损失对各参数的偏导。每层只需本层的局部梯度乘以上游传来的梯度，再把梯度继续向前传。框架（PyTorch autograd）通过计算图自动完成这一过程。" },
  { cat: "深度学习", q: "梯度消失/爆炸是什么？怎么解决？", a: "深层网络连乘梯度，因子<1 时指数衰减（消失）、>1 时指数增长（爆炸）。解决：ReLU 类激活、残差连接、BatchNorm/LayerNorm、合理初始化（He/Xavier）、梯度裁剪（防爆炸）、LSTM 门控（RNN 场景）。" },
  { cat: "深度学习", q: "为什么 Transformer 比 RNN 更适合长序列？", a: "①自注意力一步直连任意两个位置，路径长度 O(1)，长程依赖不衰减（RNN 是 O(n)）；②完全并行训练，RNN 必须串行；③多头注意力可同时建模多种关系。代价是注意力计算量随序列长度平方增长。" },
  { cat: "深度学习", q: "BatchNorm 和 LayerNorm 的区别？", a: "BatchNorm 在 batch 维度对每个特征归一化，依赖 batch 统计量，CV 常用；LayerNorm 对单个样本的全部特征归一化，不依赖 batch，适合变长序列与小 batch，是 Transformer 的标准选择。" },
  { cat: "LLM", q: "解释 LLM 的预训练-微调-对齐三阶段。", a: "预训练：海量无标注文本上自回归预测下一个 token，学到语言与世界知识；SFT：高质量指令-回答对，学会对话与执行指令；对齐：RLHF/DPO 用人类偏好优化，让输出有用、诚实、无害。每阶段数据量递减而质量要求递增。" },
  { cat: "LLM", q: "什么是幻觉？工程上如何缓解？", a: "模型生成流畅但失实的内容，根源是概率生成机制。缓解组合拳：①RAG 提供事实依据；②要求引用来源并校验；③结构化输出+规则校验；④对高风险输出加人工审核；⑤提示词明确「不知道就说不知道」；⑥用评估集持续监控幻觉率。" },
  { cat: "LLM", q: "设计一个 RAG 系统，关键决策点有哪些？", a: "①切块策略：大小/重叠/按结构；②Embedding 模型选型（中文效果、维度、成本）；③向量库选型与索引；④检索：top-k、混合检索（BM25+向量）、重排序；⑤Prompt 组装与引用格式；⑥评估：检索命中率、答案忠实度；⑦增量更新机制。能画出完整链路并说出每步的权衡即合格。" },
  { cat: "LLM", q: "什么时候选微调而不是 RAG？", a: "RAG 解决「知识」问题（事实、时效、私有数据），微调解决「行为」问题（固定风格/格式、领域语言习惯、特定任务稳定性）。决策顺序：prompt → few-shot → RAG → 微调。两者也常组合：微调定行为+RAG 供知识。" },
  { cat: "LLM", q: "Agent 和普通 LLM 调用的区别？", a: "普通调用是单轮「输入→输出」；Agent 拥有工具与循环：模型推理→决定调用工具→执行→观察结果→继续推理，直到完成目标。核心要素：工具定义（JSON Schema）、agentic loop、记忆/上下文管理、权限与安全边界。" },
  { cat: "工程", q: "如何评估和监控线上 LLM 应用的质量？", a: "①离线：构建带预期答案的评估集，每次改动跑回归（准确性/忠实度/格式合规）；②自动化：LLM-as-judge 打分+人工抽检校准；③在线：用户反馈（点赞/改写率）、任务完成率；④运维指标：延迟、token 成本、错误率；⑤安全：注入攻击与敏感输出监控。" },
  { cat: "工程", q: "线上模型效果突然下降，如何排查？", a: "按链路排查：①数据侧：输入分布是否漂移？上游数据管道是否变更/脏数据？②模型侧：是否有发版/依赖升级？③评估侧：指标计算是否变化？流量构成是否变化（新用户群）？④外部：季节性/突发事件。先看监控定位变化时间点，对比变化前后的输入样本。" },
  { cat: "行为面试", q: "你为什么要转行做 AI？（必考）", a: "结构：①真实触发点（在原工作中遇到 AI 解决/未解决的问题）；②已付出的行动证明决心（学习时长、项目、本应用的学习记录都是证据）；③原行业带来的独特价值（领域知识、数据理解、用户视角）；④长期愿景。切忌只谈「AI 火、薪资高」。" }
];

/* ---------------- 术语表 ---------------- */
const GLOSSARY = [
  { term: "人工智能", en: "Artificial Intelligence (AI)", def: "让机器表现出类人智能行为的广义领域，涵盖机器学习、知识推理、规划等。" },
  { term: "机器学习", en: "Machine Learning (ML)", def: "不显式编程规则，而是让算法从数据中自动学习规律的方法论，是现代 AI 的核心。" },
  { term: "深度学习", en: "Deep Learning (DL)", def: "基于多层神经网络的机器学习分支，擅长从原始数据（图像、文本、语音）自动学习特征。" },
  { term: "神经网络", en: "Neural Network", def: "由多层「线性变换+非线性激活」组成的可学习函数，理论上可逼近任意复杂映射。" },
  { term: "监督学习", en: "Supervised Learning", def: "用带标注（输入→正确答案）的数据训练模型学习映射关系，如分类与回归。" },
  { term: "无监督学习", en: "Unsupervised Learning", def: "在无标注数据中发现结构与模式，如聚类、降维、异常检测。" },
  { term: "强化学习", en: "Reinforcement Learning (RL)", def: "智能体通过与环境交互获得奖励信号，学习最大化长期回报的策略。" },
  { term: "特征工程", en: "Feature Engineering", def: "把原始数据加工为更有利于模型学习的特征表示，包括编码、缩放、构造与选择。" },
  { term: "损失函数", en: "Loss Function", def: "量化模型预测与真实答案差距的函数，训练即最小化损失。常见：MSE、交叉熵。" },
  { term: "梯度下降", en: "Gradient Descent", def: "沿损失梯度反方向迭代更新参数的优化算法，深度学习训练的基础。" },
  { term: "过拟合", en: "Overfitting", def: "模型过度记忆训练数据（含噪声），导致在新数据上表现差、泛化能力弱。" },
  { term: "泛化", en: "Generalization", def: "模型在未见过的数据上保持良好表现的能力，是机器学习的终极目标。" },
  { term: "Transformer", en: "Transformer", def: "基于自注意力机制的神经网络架构（2017），可全并行训练，是所有现代 LLM 的基础。" },
  { term: "注意力机制", en: "Attention", def: "通过 Query-Key 相似度对 Value 加权聚合，让模型动态关注输入中最相关的部分。" },
  { term: "大语言模型", en: "Large Language Model (LLM)", def: "在海量文本上预训练的超大参数语言模型（如 GPT、Claude），具备通用语言理解与生成能力。" },
  { term: "Token", en: "Token", def: "模型处理文本的最小单元（子词级），上下文长度与 API 计费均以 token 计。" },
  { term: "提示词工程", en: "Prompt Engineering", def: "设计与优化输入提示，引导 LLM 产生高质量、符合预期输出的工程实践。" },
  { term: "系统提示词", en: "System Prompt", def: "对话开始前设定模型角色、目标、约束与输出规范的特殊指令，权限高于用户消息。" },
  { term: "思维链", en: "Chain of Thought (CoT)", def: "让模型显式输出中间推理步骤再给答案的技巧，可显著提升复杂推理的正确率。" },
  { term: "检索增强生成", en: "RAG", def: "先从外部知识库检索相关内容，再交给 LLM 参考作答的架构，缓解幻觉与知识过时。" },
  { term: "向量数据库", en: "Vector Database", def: "存储 embedding 向量并支持高效相似度检索的数据库，如 Chroma、Milvus、FAISS。" },
  { term: "嵌入向量", en: "Embedding", def: "把文本/图像映射为稠密语义向量，语义相近则向量距离近，是检索与 RAG 的基础。" },
  { term: "微调", en: "Fine-tuning", def: "在预训练模型基础上用任务数据继续训练，使模型适配特定行为或领域。" },
  { term: "LoRA", en: "Low-Rank Adaptation", def: "参数高效微调方法：冻结原模型，仅训练低秩适配矩阵，大幅降低算力门槛。" },
  { term: "RLHF", en: "RLHF", def: "基于人类反馈的强化学习，用人类偏好数据训练奖励模型并优化 LLM 行为对齐。" },
  { term: "幻觉", en: "Hallucination", def: "LLM 生成流畅但与事实不符内容的现象，源于概率生成机制。" },
  { term: "智能体", en: "Agent", def: "能感知、推理、调用工具并循环行动以完成目标的 AI 系统，LLM 充当其「大脑」。" },
  { term: "工具调用", en: "Tool Use / Function Calling", def: "LLM 按 JSON Schema 输出对外部工具的调用请求，由宿主代码执行并回传结果。" },
  { term: "MCP", en: "Model Context Protocol", def: "Anthropic 推出的开放协议，标准化 AI 应用与外部工具、数据源的连接方式。" },
  { term: "上下文窗口", en: "Context Window", def: "模型单次请求能处理的最大 token 总量，决定能「看见」多少对话历史与资料。" },
  { term: "量化", en: "Quantization", def: "用更低比特数表示模型权重（INT8/INT4），换取更小显存与更快推理。" },
  { term: "MLOps", en: "MLOps", def: "覆盖 ML 系统全生命周期（实验、部署、监控、重训）的工程实践与工具链。" }
];
