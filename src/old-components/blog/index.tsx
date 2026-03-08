import React from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const BlogMain: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-16 sm:pt-48 space-y-6">

      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          Go Back Home
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Blog
          </h1>
          <p className="text-gray-600 mb-5 leading-relaxed text-lg hidden">
            Discover insights, tutorials, and updates from our team
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {blogPosts.map(post => (
            <Link key={post.id} to={`/blogPost/${post.id}`}>
              <motion.article
                variants={fadeInUp}
                className="bg-white duration-300 cursor-pointer group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100 rounded-2xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="py-5">
                  {/* Title */}
                  <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-3 line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <time dateTime={post.date}>{post.date}</time>
                    {/* <span className="text-gray-300">•</span>
                    <span className="text-gray-900 font-medium bg-gray-100 px-2.5 text-sm py-1 rounded-full">
                      {post.category}
                    </span> */}
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogMain;
