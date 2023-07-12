import { FindManyOptions, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { id: '1', text: 'Post 1' },
      { id: '2', text: 'Post 2' },
      { id: '3', text: 'Post 3' },
      { id: '4', text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const foundPosts = postsService.findMany();
      expect(foundPosts).toEqual(posts);
    });

    it('should return correct posts for skip and limit options', () => {
      const options: FindManyOptions = { skip: 1, limit: 2 };
      const expectedPosts = posts.slice(1, 3);
      const foundPosts = postsService.findMany(options);
      expect(foundPosts).toEqual(expectedPosts);
    });

    it('should return correct posts for skip option', () => {
      const options: FindManyOptions = { skip: 2 };
      const expectedPosts = posts.slice(2);
      const foundPosts = postsService.findMany(options);
      expect(foundPosts).toEqual(expectedPosts);
    });

    it('should return correct posts for limit option', () => {
      const options: FindManyOptions = { limit: 2 };
      const expectedPosts = posts.slice(0, 2);
      const foundPosts = postsService.findMany(options);
      expect(foundPosts).toEqual(expectedPosts);
    });

    it('should return an empty array if skip exceeds the number of posts', () => {
      const options: FindManyOptions = { skip: 10 };
      const foundPosts = postsService.findMany(options);
      expect(foundPosts).toEqual([]);
    });

    it('should return an empty array if limit is 0', () => {
      const options: FindManyOptions = { limit: 0 };
      const foundPosts = postsService.findMany(options);
      expect(foundPosts).toEqual([]);
    });
  });
});
