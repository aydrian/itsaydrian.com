export interface BlogManifest {
  posts: PostEntry[];
}

export interface PostEntry {
  filename: string;
  isDraft: boolean;
  metadata: PostMetadata;
  pathname: string;
  slug: string;
}

export interface PostMetadata {
  author: string;
  category: string;
  date: string;
  description: string;
  isDraft: boolean;
  tags: string[];
  title: string;
}
