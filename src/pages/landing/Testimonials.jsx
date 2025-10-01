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
      'I got an invite for the first time in months after reviewing my profile with provolo Provolo is where it’s at ngl🙏🏾🙏🏾🙏🏾',
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
]

export default function Testimonials() {
  return (
    <div className="py-20" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl tracking-tight text-pretty text-gray-900 sm:text-5xl">Testimonials</h2>
          <p className="mt-2 text-lg/8 text-gray-600">See what freelancers are saying.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">

          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">

              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>

                <span className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                  {post.category.title}
                </span>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-50" />

                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">{post.author.name}</p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>

              </div>

              <div className="group relative grow">
                {/* <h3 className="mt-3 text-lg/6 font-semibold text-gray-900">
                  {post.title}
                </h3> */}

                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
              </div>

     

            </article>
          ))}

        </div>
      </div>
    </div>
  )
}
