# PORTFOLIO_BRIEF.md

Content source for the rebuild of Justin Wong's personal portfolio site. Everything the site says should come from this file. Do not add metrics, results, dates, links, employers or claims that are not written here.

**Rules for the builder**

- Any field marked `TODO:` is unconfirmed. Do not render the TODO text on the live site. Omit that field (for example, hide the "View repo" button) until Justin fills it in.
- Write in first person, plainly. No em dashes anywhere in site copy (Justin doesn't use them). No hype words ("passionate", "cutting-edge", "rockstar").
- Never name a specific team, company or posting Justin applied to. The site speaks to the whole role family below.
- Design direction (from Justin): modern, sports-themed, with sports animations. The existing site lives in the GitHub repo `lightningjw/portfolio` and is served at `lightningjw.github.io/portfolio/`.

---

## 0. Positioning (for the builder; not rendered verbatim)

**Audience:** hiring managers and analysts for three overlapping role types: ML engineer, data scientist, and MLB front-office / baseball analytics.

**The common thread:** Justin owns the whole path. He gets messy, multi-source sports data into shape, builds models on it, benchmarks them honestly against a credible baseline, and puts the output in front of the people who make decisions. Baseball is the center of gravity; the methods (projection, player comparison, classification on text and images) carry across sports and across ML roles.

**Positioning statement:** A data engineer and data scientist who builds sports models end to end: the pipeline, the model, and the tool someone actually uses to decide.

**Proof points the site should make visible, in this order:**

1. **Baseline-first rigor.** Every featured model is measured against something credible: MARCEL for projections, a rule-based labeler for NLP, a two-feature model for shot prediction.
2. **Data integrity.** He checks derived figures against the source of truth before trusting them (the Statcast reconciliation in the player-evaluation project).
3. **Shipped to users.** Model output reached coaches through a dashboard they used for game strategy.
4. **Production engineering.** Pipelines on production data at enterprise scale, now his full-time job.

**Why this works for all three audiences:** ML engineers see the pipeline and deployment habit; data scientists see experimental discipline; front offices see baseball fluency plus someone who can build the infrastructure their analysts depend on.

---

## 1. Headline

> Sports analytics and machine learning, from raw data to decision.

---

## 2. Bio

> I'm a Data Engineer at Abbott, and I hold a BS in Computer Science and an MS in Data Science from the University of Michigan. Outside the day job I build sports analytics and machine learning projects, with baseball at the center: projection models, player evaluation, and the data pipelines underneath them. I also did lead data analysis for the Mets de Guaynabo, a professional basketball team in Puerto Rico's BSN league.

---

## 3. Featured projects

Order is intentional: baseball first, then other sports, then the one non-sports ML project.

### 3.1 MLB Player OPS Forecasting

- **Sport:** Baseball
- **Question:** Can a model that accounts for a hitter's run environment project next-season OPS more accurately than MARCEL?
- **Data:** Lahman database historical MLB batting data, plus team offensive efficiency (runs per game) lagged one and two years, and age adjustments. 
- **Method:** Random Forest regression in R (randomForest, dplyr, tidyverse, RSQLite), 70/30 train/test split, evaluated on mean squared error against the MARCEL benchmark. The lagged team runs-per-game feature separates player skill from the offensive context around him.
- **Headline result:** 9% lower mean squared error than MARCEL.
- **Link:** TODO: repo or write-up URL.
- **Why it matters to a team:** Projection systems sit underneath trade, free-agency and roster decisions, and a model that beats a standard public baseline with transparent, explainable features is the kind of foundation an analytics group can extend.

### 3.2 Prospect Evaluation: Bryce Eldridge Archetype and Contact Quality

- **Sport:** Baseball
- **Question:** How do you value a top prospect with almost no MLB sample? Which established hitters is he physically built like, and where does he already match or trail them?
- **Data:** Physical and developmental attributes (height, weight, handedness, draft position, debut age, amateur path, speed grade) from Baseball Reference; Statcast metrics from Baseball Savant via pybaseball; FanGraphs leaderboards; Baseball America scouting grades.
- **Method:** K-means and hierarchical clustering on stat-independent physical attributes (silhouette analysis to choose K, PCA to visualize) to find his nearest physical comps; Statcast comparison against those comps across exit velocity, barrel rate, xwOBA, K%, BB% and chase rate; development-arc trajectories and bootstrap confidence intervals. Before finalizing, he caught that pybaseball's pitch-level exit velocity and xwOBA conflicted with Baseball Savant's published figures and corrected the analysis to the published numbers.
- **Headline result:** Nearest physical comps were James Wood, Aaron Judge, Matt Olson, Yordan Alvarez and Ryan Mountcastle. In his 37-PA 2025 debut, Eldridge's contact quality (95.6 mph average exit velocity, .362 xwOBA) already matched or exceeded those comps, while his 35.1% strikeout rate was driven by in-zone misses rather than chasing (chase rate about 17%). That isolates in-zone contact as the development variable that decides his ceiling.
- **Link:** TODO: repo or notebook URL.
- **Why it matters to a team:** It shows how to evaluate a player when the sample is too small to trust, by combining physical-archetype comps with process metrics, and it shows the habit of reconciling data sources before a number reaches a decision-maker.

### 3.3 Baseball Play Outcome Classification

- **Sport:** Baseball
- **Question:** Can free-text play-by-play descriptions be classified into nine play outcomes without hand-labeling the data?
- **Data:** A curated dataset of about 1,400 baseball play descriptions. TODO: where the play-by-play text came from.
- **Method:** Weak supervision: rule-based labeling to generate training labels, then fine-tuned DistilBERT (Python, PyTorch, Hugging Face Transformers, pandas).
- **Headline result:** 15-point accuracy improvement over the rule-based baseline. TODO: absolute accuracy, if Justin wants it shown.
- **Link:** TODO: repo URL.
- **Why it matters to a team:** A lot of baseball information still lives in text, and a cheap labeling pipeline turns it into structured, queryable data without weeks of manual tagging.

### 3.4 BSN Shot Outcome Prediction (Mets de Guaynabo)

- **Sport:** Basketball
- **Question:** Can shot success be predicted using only information available at the moment of the shot?
- **Data:** SynergySports API data combined with web-scraped BSN play-by-play; 34K+ shot attempts after cleaning, processed through a Python ETL pipeline into MySQL.
- **Method:** Engineered features for game clock (plus a quadratic clock term for late-game pressure), zone defense, situational flags (after timeout, sideline and baseline out-of-bounds), shot type, home/away, and one-hot shooter and defender identities. Logistic regression as an interpretable baseline, compared against random forest, KNN, naive Bayes and a neural network, tuned with GridSearchCV. Logistic regression won.
- **Headline result:** 64.7% cross-validated accuracy, 11 percentage points above a baseline using only zone defense and game quarter, with a minimal train/test gap. The ETL pipeline cut processing time by 90%. Results reached coaches through an R Shiny dashboard used for game strategy and scouting.
- **Link:** https://lightningjw.github.io/bsn-pbp-analysis/
- **Why it matters to a team:** It is the complete loop an analytics department runs every day: messy multi-source event data, a model tested against simpler alternatives, and output delivered in a form coaches actually used.

### 3.5 Formula One Constructor Image Classification

- **Sport:** Motorsport (Formula One)
- **Question:** Can a model identify which of eight F1 constructors a car belongs to from a single image?
- **Data:** TODO: image source and dataset size.
- **Method:** A preprocessing pipeline that cleaned corrupted files and rebalanced classes, then a comparison of shallow CNNs, vision transformers and a pre-trained ResNet-50 (Python, PyTorch).
- **Headline result:** 96% validation accuracy with ResNet-50, outperforming shallow CNNs and vision transformers on limited data.
- **Link:** TODO: repo URL.
- **Why it matters to a team:** Video and image data is a growing source of player and game information, and this shows how to get a strong vision model out of a small labeled set through transfer learning and careful data cleaning.

### 3.6 GPT-Style Language Model Pretraining and Fine-Tuning

- **Sport:** None (core ML engineering)
- **Question:** What does it take to build, pretrain and fine-tune a decoder-only transformer from scratch?
- **Data:** A 1B-token text corpus. TODO: corpus name.
- **Method:** Decoder-only transformer with multi-head self-attention and causal masking, GPU-accelerated training, reproducible training pipelines with Weights & Biases experiment tracking and hyperparameter tuning, benchmarked on instruction following (Python, PyTorch).
- **Headline result:** TODO: a result to show (for example, a benchmark score or loss), or leave this field out.
- **Link:** TODO: repo URL.
- **Why it matters to a team:** Sequence models are a natural fit for pitch sequences and possessions, and building one from the ground up means understanding the model well enough to debug and adapt it rather than treating it as a black box.

---

## 4. Skills

No proficiency ratings. Render as grouped tag lists.

- **Languages:** Python, SQL, R, JavaScript, HTML/CSS, Java, C/C++, Bash
- **ML / statistics:** PyTorch, Hugging Face Transformers, scikit-learn, supervised learning, clustering (K-means, hierarchical), PCA, random forests, NLP, computer vision (CNNs, ResNet, vision transformers), feature engineering, cross-validation and model evaluation, bootstrap confidence intervals, A/B testing and experiment analysis
- **Data engineering:** ETL pipelines, web scraping, REST APIs, Azure Data Factory, Azure Blob Storage, Azure SQL, Google BigQuery, MySQL, Postgres. Sports data: Statcast / Baseball Savant, pybaseball, Lahman database, SynergySports API
- **Tools:** Git, Linux, Weights & Biases, GPU / HPC training, pandas, NumPy, Power BI, Tableau, R Shiny, React, D3, Plotly, Matplotlib, Flask, Django, OpenCV

---

## 5. Experience

Reverse chronological. One entry per role.

**Abbott** · Data Engineer · July 2026 – Present
Build data pipelines that support analytics and machine learning.
Location: Chicago, IL

**Mets de Guaynabo** (BSN, professional basketball) · Lead Data Analyst · Guaynabo, Puerto Rico · March 2023 – May 2026
- Trained and evaluated supervised ML models on 34K+ shot attempts with engineered game-context and matchup features, improving predictive accuracy by 11 percentage points to support scouting and play-calling.
- Architected Python ETL pipelines to scrape and merge multi-source play-by-play data, cutting processing time by 90% and powering an R Shiny dashboard coaches and analysts used for game strategy.

**Nestlé Purina PetCare** · Applied Data Scientist Intern · St. Louis, MO · May 2025 – August 2025
- Built SQL and Python analytics pipelines and Power BI dashboards on Azure SQL production data (robotics telemetry and manufacturing KPIs across 23 factories), enabling real-time monitoring and contributing to $21M in projected cost savings.
- Automated maintenance analytics and ROI reporting with reproducible Python pipelines, reducing manual reporting effort by 85%.

**In-Person Away Virtual Events** · Software Engineer · Ann Arbor, MI · January 2023 – January 2024
- Built a modular control system using computer vision for real-time localization and navigation, validated across 3 hardware prototypes and 5+ live trials.
- Led a 5-member engineering team translating stakeholder requirements into system architecture and a prioritized roadmap.

**Ritz Deli Mobile Gaming Company** · Data Science Intern · Oakland, CA · February 2020 – August 2023
- Analyzed telemetry from 5,000+ beta testers with SQL and Python to train predictive models and trend forecasts for in-game economy tuning.
- Led A/B testing and experiment analysis that drove a 25% increase in player retention.

---

## 6. Education

**University of Michigan, Ann Arbor**
- MS, Data Science · August 2025 – May 2026 · GPA 4.00 · Engineering Global Leadership Honors Program, International Minor, Tauber Institute Fellow
- BSE, Computer Science · August 2021 – May 2025 · GPA 3.90 · Tau Beta Pi, Mcity research, Robotic Submarine project team, study abroad at University College Dublin

---

## 7. Contact

- **Email:** juswon@umich.edu
- **GitHub:** https://github.com/lightningjw
- **LinkedIn:** https://www.linkedin.com/in/jusawon/

No phone number or street address on the site.
