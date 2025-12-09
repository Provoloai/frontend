import React from "react";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useParams } from "@tanstack/react-router";
import { blogPosts } from "@/data";
import { motion } from "motion/react";

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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const BlogPostSingle: React.FC = () => {
  const { blogpostId } = useParams({
    from: "/blogPost/$blogpostId",
  });

  console.log(blogpostId);

  const blogPost = blogPosts.find(post => post.id.toString() === blogpostId);
  return (
    <>
      <Header />
      <div className="min-h-screen bg- px-6 py-16 sm:pt-48 space-y-6">
        {/* <div className="mx-auto max-w-4xl"> */}
        {/* Back Button */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to blog</span>
          </motion.button>
        </div>

        {/* Article Header */}
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            {/* Category */}
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                {blogPost?.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {blogPost?.title}
            </h1>

            {/* Excerpt */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              {blogPost?.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{blogPost?.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{blogPost?.readTime}</span>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8">
              <img
                src={blogPost?.author.avatar}
                alt={blogPost?.author.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  {blogPost?.author.name}
                </p>
                <p className="text-gray-600">{blogPost?.author.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-12"
          >
            <div className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden">
              <img
                src={blogPost?.image}
                alt={blogPost?.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="prose prose-lg max-w-none mb-12"
          >
            {blogPost?.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 leading-relaxed mb-6 text-justify"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="pt-8 border-t border-gray-200"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share this article
              </h3>
              <div className="flex items-center gap-3">
                <button className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-3 bg-sky-50 text-sky-600 rounded-full hover:bg-sky-100 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-3 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-12 p-8 bg-gray-50 rounded-2xl"
          >
            <div className="flex items-start gap-6">
              <img
                src={blogPost?.author.avatar}
                alt={blogPost?.author.name}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {blogPost?.author.name}
                </h3>
                <p className="text-gray-600 mb-3">{blogPost?.author.role}</p>
                <p className="text-gray-700 leading-relaxed">
                  {blogPost?.author.bio}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Posts Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-16 pt-12 border-t border-gray-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(item => (
                <div
                  key={item}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="h-48 bg-gray-100">
                    <img
                      src={`https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80`}
                      alt={`Related post ${item}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-gray-600">Marketing</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">
                      {item === 1
                        ? "Boost your conversion rate"
                        : "Improve your customer experience"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Learn effective strategies to improve your business
                      metrics and drive growth.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </article>
      </div>
      <Footer />
    </>
  );
};

export default BlogPostSingle;
