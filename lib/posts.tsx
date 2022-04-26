import fs, { promises as fsPromise } from 'fs';
import matter from 'gray-matter';
import path from 'path';

const getPosts = async () => {
  const markdownDir = path.join(process.cwd(), 'markdown');
  const fileNames = await fsPromise.readdir(markdownDir);
  const posts = fileNames.map((name )=> {
    const fullPath = path.join(markdownDir, name)
    console.log('fullPath');
    const id = name.replace(/\.md$/g, '')
    const text = fs.readFileSync(fullPath, 'utf8')
    const {data:{title, date}, content} = matter (text)
    return {
      id, title, date
    }
  })
  console.log('x');
  console.log(posts);
  return posts;
}
export default getPosts;