// Realistic health news articles for demo
import { Article, HealthCategory } from '@/types';

export const mockHealthArticles: Article[] = [
  {
    id: '1',
    title: 'Revolutionary Gene Therapy Shows Promise in Treating Rare Blood Disorders',
    content: `Scientists at Johns Hopkins University have developed a groundbreaking gene therapy that successfully treats patients with sickle cell disease and beta-thalassemia. The treatment, called CTX001, uses CRISPR gene-editing technology to modify patients' own blood stem cells.

In clinical trials involving 75 patients, 95% showed significant improvement in their condition within six months. The therapy works by editing the BCL11A gene, which controls the production of fetal hemoglobin, a type of hemoglobin that can compensate for defective adult hemoglobin.

"This represents a potential cure for these devastating inherited blood disorders," said Dr. Sarah Chen, lead researcher on the project. "Patients who previously required monthly blood transfusions are now living normal lives."

The treatment involves extracting the patient's bone marrow stem cells, editing them in the laboratory, and then reintroducing them into the patient's body. While promising, the therapy costs approximately $2.1 million per patient and requires specialized medical facilities.

The FDA is expected to make a decision on approval by the end of 2024.`,
    source: 'Johns Hopkins Medicine',
    publishedAt: new Date('2024-01-15'),
    category: 'Medical Breakthroughs',
    url: 'https://example.com/gene-therapy',
    imageUrl: '/api/placeholder/400/250'
  },
  {
    id: '2',
    title: 'New Study Links Gut Microbiome to Depression and Anxiety Disorders',
    content: `A comprehensive study published in Nature Medicine reveals strong connections between gut bacteria and mental health conditions. Researchers analyzed gut microbiome samples from 10,000 participants across 12 countries.

The study found that people with depression and anxiety had significantly different bacterial compositions compared to healthy individuals. Specifically, they showed reduced levels of Bifidobacterium and Lactobacillus species, which are known to produce mood-regulating neurotransmitters.

"The gut-brain axis is more powerful than we previously understood," explained Dr. Michael Rodriguez, psychiatrist and study co-author. "These findings suggest that targeted probiotic treatments could complement traditional mental health therapies."

The research team developed a "mental health microbiome score" that accurately predicted depression in 78% of cases. Participants who took specific probiotic supplements showed 40% improvement in anxiety symptoms over 12 weeks.

This research opens new avenues for treating mental health conditions through gut health interventions, potentially offering hope for patients who don't respond well to conventional treatments.`,
    source: 'Nature Medicine',
    publishedAt: new Date('2024-01-12'),
    category: 'Mental Health',
    url: 'https://example.com/gut-brain',
    imageUrl: '/api/placeholder/400/250'
  },
  {
    id: '3',
    title: 'AI-Powered Drug Discovery Cuts Cancer Treatment Development Time by 60%',
    content: `Pharmaceutical company Nexus Therapeutics has successfully used artificial intelligence to develop a new cancer immunotherapy in just 18 months, compared to the typical 4-5 years. The AI system, called MolecularMind, analyzed over 100 million molecular compounds to identify promising drug candidates.

The breakthrough treatment targets PD-L1 proteins on cancer cells, helping the immune system recognize and destroy tumors more effectively. In Phase II trials, the drug showed remarkable results in treating advanced lung cancer, with 68% of patients experiencing tumor shrinkage.

"AI has revolutionized our approach to drug discovery," said Dr. Lisa Park, Chief Scientific Officer at Nexus. "We can now predict molecular behavior and drug interactions with unprecedented accuracy."

The AI system considered factors including toxicity, bioavailability, and potential side effects during the design process. This precision approach resulted in fewer failed candidates and reduced development costs by approximately $800 million.

The FDA has granted breakthrough therapy designation, fast-tracking the approval process. If approved, this could mark the beginning of a new era in personalized cancer treatment.`,
    source: 'Nexus Therapeutics',
    publishedAt: new Date('2024-01-10'),
    category: 'Healthcare Technology',
    url: 'https://example.com/ai-drug-discovery',
    imageUrl: '/api/placeholder/400/250'
  },
  {
    id: '4',
    title: 'Mediterranean Diet Reduces Risk of Alzheimer\'s Disease by 53%, Long-term Study Finds',
    content: `A 20-year longitudinal study tracking 15,000 participants reveals that following a Mediterranean diet can significantly reduce the risk of developing Alzheimer's disease. The research, published in the Journal of the American Medical Association, shows the strongest evidence yet for diet's role in brain health.

Participants who closely followed the Mediterranean diet—rich in olive oil, fish, nuts, fruits, and vegetables—had a 53% lower risk of developing Alzheimer's compared to those with poor dietary habits. The protective effects were most pronounced in individuals with genetic predisposition to the disease.

"The Mediterranean diet appears to protect brain cells from the inflammation and oxidative stress that contribute to Alzheimer's," explained Dr. Elena Vasquez, lead neurologist on the study. "The antioxidants and omega-3 fatty acids seem to maintain cognitive function as we age."

The study also found that participants following the diet had larger brain volumes in areas crucial for memory and learning. Blood tests showed reduced levels of beta-amyloid proteins, which form the characteristic plaques seen in Alzheimer's patients.

Researchers recommend starting the diet early in life for maximum protection, though benefits were observed even when participants began in their 60s.`,
    source: 'JAMA Neurology',
    publishedAt: new Date('2024-01-08'),
    category: 'Nutrition Research',
    url: 'https://example.com/mediterranean-alzheimers',
    imageUrl: '/api/placeholder/400/250'
  },
  {
    id: '5',
    title: 'Breakthrough Immunotherapy Offers Hope for Type 1 Diabetes Patients',
    content: `Researchers at Stanford University have developed a revolutionary immunotherapy that preserves insulin-producing cells in newly diagnosed Type 1 diabetes patients. The treatment uses specially engineered immune cells to prevent the autoimmune destruction of pancreatic beta cells.

In clinical trials, 70% of patients treated within six months of diagnosis maintained significant insulin production for over two years. This represents a major breakthrough for a disease that affects 1.6 million Americans and typically requires lifelong insulin therapy.

"We're essentially reprogramming the immune system to stop attacking the pancreas," said Dr. James Liu, principal investigator. "This could transform Type 1 diabetes from a progressive disease into a manageable condition."

The therapy involves extracting the patient's immune cells, modifying them to become regulatory T-cells, and reinfusing them. These modified cells then protect the insulin-producing beta cells from autoimmune attack.

Patients in the trial required 75% less insulin than control groups and experienced fewer dangerous blood sugar fluctuations. The treatment appears most effective when administered early in the disease course, highlighting the importance of rapid diagnosis and intervention.`,
    source: 'Stanford Medicine',
    publishedAt: new Date('2024-01-05'),
    category: 'Treatment Advances',
    url: 'https://example.com/diabetes-immunotherapy',
    imageUrl: '/api/placeholder/400/250'
  },
  {
    id: '6',
    title: 'Wearable Devices Detect Heart Attacks 2 Hours Before Symptoms Appear',
    content: `A new generation of smartwatches and fitness trackers can predict heart attacks up to two hours before symptoms begin, according to research from MIT and Massachusetts General Hospital. The devices use advanced algorithms to analyze heart rate variability, skin temperature, and blood oxygen levels.

The study followed 50,000 participants wearing the devices for three years. The AI system successfully predicted 89% of heart attacks, with only 3% false positives. The technology identifies subtle changes in cardiovascular patterns that occur before a person feels chest pain or other symptoms.

"This gives us a critical window to intervene and potentially prevent heart attacks," explained Dr. Priya Patel, cardiologist and study coordinator. "Patients could take medication or seek immediate medical attention before permanent heart damage occurs."

The predictive algorithm was trained on data from over 200,000 heart attack cases worldwide. It considers factors including irregular heart rhythms, decreased heart rate variability, and changes in sleep patterns that often precede cardiac events.

Several major wearable device manufacturers are already implementing this technology, with FDA approval expected within the next 18 months.`,
    source: 'MIT Technology Review',
    publishedAt: new Date('2024-01-03'),
    category: 'Healthcare Technology',
    url: 'https://example.com/wearable-heart-attack',
    imageUrl: '/api/placeholder/400/250'
  },
  {
    id: '7',
    title: 'Revolutionary Sleep Study Links Quality Rest to Immune System Strength',
    content: `Groundbreaking research from the University of California reveals that consistent, quality sleep dramatically strengthens immune function and disease resistance. The study tracked 25,000 participants over five years, measuring sleep patterns alongside immune markers and illness rates.

Participants who maintained 7-9 hours of quality sleep nightly showed 300% stronger immune responses to vaccines and were 70% less likely to develop respiratory infections. The research identified specific sleep stages crucial for immune memory formation.

"Sleep isn't just rest—it's when our immune system consolidates its defenses," said Dr. Rachel Kim, sleep medicine specialist. "Deep sleep stages allow immune cells to migrate to lymph nodes and form protective memories against pathogens."

The study found that people with irregular sleep schedules had chronically elevated inflammation markers, similar to those seen in autoimmune diseases. Conversely, good sleepers showed enhanced T-cell function and more robust antibody production.

Researchers developed personalized sleep optimization protocols that improved immune function in 85% of participants within eight weeks. These findings have significant implications for pandemic preparedness and overall public health strategies.`,
    source: 'UC Sleep Research Center',
    publishedAt: new Date('2024-01-01'),
    category: 'Prevention Tips',
    url: 'https://example.com/sleep-immune-system',
    imageUrl: '/api/placeholder/400/250'
  },
  {
    id: '8',
    title: 'Personalized Cancer Vaccines Show 90% Success Rate in Preventing Recurrence',
    content: `A revolutionary approach to cancer treatment using personalized vaccines has shown unprecedented success in preventing cancer recurrence. The treatment, developed by researchers at Memorial Sloan Kettering, creates custom vaccines tailored to each patient's unique tumor profile.

In a landmark study of 500 melanoma patients, personalized vaccines prevented cancer recurrence in 90% of cases over a three-year follow-up period. The vaccines train the immune system to recognize and attack cancer cells specific to each individual patient.

"This represents a paradigm shift in cancer treatment," explained Dr. Maria Santos, oncologist and lead researcher. "Instead of using one-size-fits-all treatments, we're creating precision weapons that target each patient's specific cancer."

The vaccine creation process involves analyzing tumor samples to identify unique protein signatures (neoantigens) specific to that patient's cancer. These signatures are then incorporated into a personalized mRNA vaccine that teaches the immune system to recognize and destroy any remaining cancer cells.

The treatment is currently being expanded to lung, breast, and colorectal cancers, with early results showing similar promise across different cancer types.`,
    source: 'Memorial Sloan Kettering',
    publishedAt: new Date('2023-12-28'),
    category: 'Medical Breakthroughs',
    url: 'https://example.com/personalized-cancer-vaccines',
    imageUrl: '/api/placeholder/400/250'
  }
];

export const getArticlesByCategory = (category?: HealthCategory): Article[] => {
  if (!category) return mockHealthArticles;
  return mockHealthArticles.filter(article => article.category === category);
};

export const getRecentArticles = (days: number = 7): Article[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  return mockHealthArticles.filter(article => article.publishedAt >= cutoffDate);
};

export const searchArticles = (searchTerm: string): Article[] => {
  const term = searchTerm.toLowerCase();
  return mockHealthArticles.filter(article => 
    article.title.toLowerCase().includes(term) ||
    article.content.toLowerCase().includes(term) ||
    article.category.toLowerCase().includes(term)
  );
};