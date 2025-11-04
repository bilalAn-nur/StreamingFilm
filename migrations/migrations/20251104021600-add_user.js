const bcrypt = require("bcryptjs");

module.exports = {
  async up(db, client) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection("users").insertOne({
      name: "Fieldmarshal",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      profilePicture: "https://api.dicebear.com/6.x/bottts/png?seed=admin",
      likeAnime: [],
      favoriteGenre: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Admin user added");
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection("users").deleteOne({ email: "admin@gmail.com" });
    console.log("Admin user removed");
  },
};
