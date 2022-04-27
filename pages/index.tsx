import { GetServerSideProps, NextPage } from 'next'
import {UAParser} from 'ua-parser-js'
import styles from '../styles/Home.module.css'

interface Props{
  browser: {
    name: string
    version: string
    major: string
  }
}
const Index: NextPage<Props> = (props) => {
  return (
    <div>
      <h1 className={styles.container}>
        你的浏览器是 {props.browser.name}
      </h1>
    </div>
  )
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser
    }
  }
}