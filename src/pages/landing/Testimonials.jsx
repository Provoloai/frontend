import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";

const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    description:
      'My Proposal Got Viewed for the third time Since I used @provoloai To optimize my Upwork profile 🎊',
    date: 'Sep 03, 2025',
    datetime: '2025-09-07',
    category: { title: 'Cloud Engineer' },
    author: {
      name: 'Ayoola Oladeji',
      role: '@Layi_Fx',
      imageUrl:
        'https://pbs.twimg.com/profile_images/1919496873880047616/wD_D-mB9_400x400.jpg',
    },
  },
  {
    id: 2,
    title: 'How to use search engine optimization to drive sales',
    description:
      "I must say you've built something so amazing. i love how it optimises ones Upwork profile in secs.and it is so user friendly,well detailed and seriously I was amazed.",
    date: 'Aug 5, 2025',
    datetime: '2020-03-10',
    category: { title: 'Voiceover Artist' },
    author: {
      name: 'Scholastica_D_VA',
      role: '@nsemeke_ekpo',
      imageUrl:
        'https://pbs.twimg.com/profile_images/1961821118550925312/y5_HvFYC_400x400.jpg',
    },
  },
  {
    id: 3,
    title: 'Improve your customer experience',
    description:
      'I got an invite for the first time in months after reviewing my profile with provolo Provolo is where it\'s at ngl 🙏🏾🙏🏾🙏🏾',
    date: 'Sep 8, 2025',
    datetime: '2020-02-12',
    category: { title: 'Entrepreneur' },
    author: {
      name: 'Judah',
      role: '@OshomaPraiz',
      imageUrl:
        'https://pbs.twimg.com/profile_images/1869072688364376064/t7k7zKep_400x400.jpg',
    },
  },
];

export default function Testimonials() {
  const [imagesLoaded, setImagesLoaded] = useState({});
  const imageRefs = useRef([]);

  // Lazy load profile images
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src && !imagesLoaded[img.dataset.index]) {
            img.src = img.dataset.src;
            setImagesLoaded(prev => ({ ...prev, [img.dataset.index]: true }));
          }
        }
      });
    }, options);

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [imagesLoaded]);

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="pt-20" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl lg:mx-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px", amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl tracking-tight text-pretty text-gray-900 sm:text-5xl"
            variants={headerVariants}
          >
            Testimonials
          </motion.h2>
          <motion.p
            className="mt-2 text-lg/8 text-gray-600"
            variants={headerVariants}
          >
            See what freelancers are saying.
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px", amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
              variants={cardVariants}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>

                <span className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                  {post.category.title}
                </span>
              </div>

              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  ref={(el) => (imageRefs.current[index] = el)}
                  data-src={post.author.imageUrl}
                  data-index={index}
                  alt={`${post.author.name} profile`}
                  className="size-10 rounded-full bg-gray-50"
                  loading="lazy"
                />

                <div>
                  <p className="font-semibold text-gray-900">{post.author.name}</p>
                  <p className="text-gray-600 text-sm">{post.author.role}</p>
                </div>
              </div>

              <div className="group relative grow">
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  {post.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}