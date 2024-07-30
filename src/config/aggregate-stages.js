db.users.insertMany([
    { userId: 1, name: "Alice", age: 30 },
    { userId: 2, name: "Bob", age: 25 },
    { userId: 3, name: "Charlie", age: 35 }
]);


db.posts.insertMany([
    { postId: 1, userId: 1, title: "First Post", content: "Hello World!", tags: ["introduction", "welcome", "update"] },
    { postId: 2, userId: 1, title: "Second Post", content: "Another post", tags: ["update"] },
    { postId: 3, userId: 2, title: "Bob's Post", content: "Bob's content", tags: ["bob", "personal", "update"] },
    { postId: 4, userId: 3, title: "Charlie's Post", content: "Charlie's content", tags: ["charlie", "personal"] },
    { postId: 5, userId: 3, title: "Charlie's Second Post", content: "Another post by Charlie", tags: ["charlie", "update"] }
]);

db.posts.aggregate([
    // Stage 1: Match posts with specific tags
    { $match: { tags: "update" } },

    // Stage 2: Unwind the tags array
    { $unwind: "$tags" },

    // Stage 3: Project only necessary fields
    {
        $project: {
            _id: 0,
            postId: 1,
            userId: 1,
            title: 1,
            tags: 1
        }
    },

    // Stage 4: Group posts by userId and count the number of posts
    {
        $group: {
            _id: "$userId",
            totalPosts: { $sum: 1 }
        }
    },

    // Stage 5: Sort by totalPosts in descending order
    { $sort: { totalPosts: -1 } },

    // Stage 6: Skip the first result (optional)
    { $skip: 0 },

    // Stage 7: Limit the result to 2 users
    { $limit: 2 }
]);




/*
WITH post_tags AS (
  SELECT
    p.userId,
    t.tag
  FROM
    posts p,
    UNNEST(p.tags) AS t(tag)
  WHERE
    t.tag = 'update'
),
user_post_counts AS (
  SELECT
    userId,
    COUNT(*) AS totalPosts
  FROM
    post_tags
  GROUP BY
    userId
  ORDER BY
    totalPosts DESC
)
SELECT
  userId,
  totalPosts
FROM
  user_post_counts
LIMIT 2;












































* */