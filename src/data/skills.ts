export interface SkillGroup {
  id: string;
  name: string;
  items: readonly string[];
  /** A labelled sub-list rendered after the main items. */
  sublist?: { label: string; items: readonly string[] };
}

/** Four groups, in the brief's order. No proficiency ratings. */
export const skills: readonly SkillGroup[] = [
  {
    id: 'languages',
    name: 'Languages',
    items: ['Python', 'SQL', 'R', 'JavaScript', 'HTML/CSS', 'Java', 'C/C++', 'Bash'],
  },
  {
    id: 'ml-statistics',
    name: 'ML / statistics',
    items: [
      'PyTorch',
      'Hugging Face Transformers',
      'scikit-learn',
      'supervised learning',
      'clustering (K-means, hierarchical)',
      'PCA',
      'random forests',
      'NLP',
      'computer vision (CNNs, ResNet, vision transformers)',
      'feature engineering',
      'cross-validation and model evaluation',
      'bootstrap confidence intervals',
      'A/B testing and experiment analysis',
    ],
  },
  {
    id: 'data-engineering',
    name: 'Data engineering',
    items: [
      'ETL pipelines',
      'web scraping',
      'REST APIs',
      'Azure Data Factory',
      'Azure Blob Storage',
      'Azure SQL',
      'Google BigQuery',
      'MySQL',
      'Postgres',
    ],
    sublist: {
      label: 'Sports data',
      items: ['Statcast / Baseball Savant', 'pybaseball', 'Lahman database', 'SynergySports API'],
    },
  },
  {
    id: 'tools',
    name: 'Tools',
    items: [
      'Git',
      'Linux',
      'Weights & Biases',
      'GPU / HPC training',
      'pandas',
      'NumPy',
      'Power BI',
      'Tableau',
      'R Shiny',
      'React',
      'D3',
      'Plotly',
      'Matplotlib',
      'Flask',
      'Django',
      'OpenCV',
    ],
  },
];
