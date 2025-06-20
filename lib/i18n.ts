export type Locale = 'en' | 'id';

export const defaultLocale: Locale = 'en';

export const locales: Locale[] = ['en', 'id'];

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      greeting: "Hi, I'm Fahmi",
      description: "A passionate learner in Data Analysis, Data Science, and Python Programming. I'm driven by curiosity and enjoy exploring how data can be used to generate insights and solve real-world problems."
    },
    about: {
      title: 'About Me',
      greeting: 'Hello 👋',
      content: "I'm a Computer Science student with a strong passion for Data Analysis, Data Science, and Python Development. I enjoy exploring data, extracting valuable insights, and building solutions that solve real-world problems.\n\nWith hands-on experience using tools like Google Colab, Python libraries, and basic web technologies like HTML, CSS, and JavaScript, I strive to combine data-driven thinking with practical application.\n\nMy learning journey has also led me to explore backend tools like MongoDB and PHP, enriching my understanding of fullstack development. I approach every project with curiosity, logical thinking, and a strong desire to keep improving. Outside of coding, I'm passionate about continuous learning and sharing knowledge with others."
    },
    education: {
      title: 'Education',
      degree: 'Computer Science Student',
      institution: 'Bina Sarana Informatika, 2023'
    },
    skills: {
      title: 'Skills'
    },
    projects: {
      title: 'Projects',
      placeholder: {
        title: 'Project Title',
        description: 'Project description will be added here...'
      }
    },
    contact: {
      title: 'Get in Touch',
      description: 'Feel free to reach out to me through any of these platforms:'
    }
  },
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      education: 'Pendidikan',
      skills: 'Keahlian',
      projects: 'Proyek',
      contact: 'Kontak'
    },
    hero: {
      greeting: "Hi, I'm Fahmi",
      description: "Seorang antusias di bidang Data Analysis, Data Science, dan Python Programming. Saya memiliki semangat tinggi untuk belajar dan mengeksplorasi bagaimana data dapat digunakan untuk memberikan insight dan solusi dalam berbagai konteks."
    },
    about: {
      title: 'Tentang Saya',
      greeting: 'Halo 👋',
      content: "Saya adalah mahasiswa Ilmu Komputer dengan minat besar dalam Data Analysis, Data Science, dan Pengembangan Python. Saya senang mengeksplorasi data, menemukan insight berharga, dan membangun solusi yang dapat diterapkan dalam kehidupan nyata.\n\nSaya memiliki pengalaman menggunakan alat seperti Google Colab, library Python, serta teknologi web dasar seperti HTML, CSS, dan JavaScript, yang saya gunakan untuk menggabungkan logika data dengan implementasi nyata.\n\nSaya juga telah belajar tentang backend seperti MongoDB dan PHP, yang memperluas pemahaman saya tentang pengembangan fullstack. Saya mendekati setiap proyek dengan rasa ingin tahu, pemikiran logis, dan semangat untuk terus berkembang. Di luar coding, saya sangat menyukai pembelajaran berkelanjutan dan berbagi ilmu dengan orang lain."
    },
    education: {
      title: 'Pendidikan',
      degree: 'Mahasiswa Ilmu Komputer',
      institution: 'Bina Sarana Informatika, 2023'
    },
    skills: {
      title: 'Keahlian'
    },
    projects: {
      title: 'Proyek',
      placeholder: {
        title: 'Judul Proyek',
        description: 'Deskripsi proyek akan ditambahkan di sini...'
      }
    },
    contact: {
      title: 'Hubungi Saya',
      description: 'Jangan ragu untuk menghubungi saya melalui platform berikut:'
    }
  }
};