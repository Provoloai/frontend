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
    <div className="min-h-screen bg- px-6 py-16 sm:pt-52">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back Home
          </Link>
          <h2>Our Blog</h2>
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
            <motion.article
              key={post.id}
              variants={fadeInUp}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-900 font-medium bg-gray-100 px-2.5 text-sm py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <Link to={`/blogPost/${post.id}`}>
                  <h2 className="text-lg font-bold text-gray-900 mb-3 hover:text-gray-700 cursor-pointer transition-colors">
                    {post.title}
                  </h2>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogMain;
