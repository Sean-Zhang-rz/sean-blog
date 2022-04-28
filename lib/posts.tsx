import fs, { promises as fsPromise } from 'fs';
import matter from 'gray-matter';
import path from 'path';

const markdownDir = path.join(process.cwd(), 'markdown');

const getPosts = async () => {
  const fileNames = await fsPromise.readdir(markdownDir);
  const posts = fileNames.map((name )=> {
    const fullPath = path.join(markdownDir, name)
    const id = name.replace(/\.md$/g, '')
    const text = fs.readFileSync(fullPath, 'utf8')
    const {data:{title, date},} = matter (text)
    return JSON.parse(JSON.stringify({
      id, title, date
    }))
  })
  console.log('x');
  console.log(posts);
  return posts;
}

export default getPosts;

export const getPost = async (id: string) => {
  const fullPath = path.join(markdownDir, id + '.md')
    const text = fs.readFileSync(fullPath, 'utf8')
    const {data:{title, date}, content} = matter (text)
    return JSON.parse(JSON.stringify({
      id, title, date, content
    }))
}

export const getPostIds=async () => {
  const fileNames = await fsPromise.readdir(markdownDir);
  return fileNames.map(name => name.replace(/\.md$/g, ''))
}