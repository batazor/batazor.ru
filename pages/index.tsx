import type { NextPage } from 'next'
import Head from 'next/head'
import {Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8"/>
        <title>Victor Login | batazor.ru</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <meta name="description" content="Entrypoint: Логин Виктор (@batazor)." />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <body>
        <div className="content">
          <header id="header">
            <img src="./batazor.png" className="logo" alt="logo batazor" />
          </header>
          <article className="about">
            <h1>Victor Login @batazor</h1>

            <div>
              <Link href="https://github.com/batazor">
                <FontAwesomeIcon className="social-buttons" icon={faGithub} />
              </Link>

              <Link href="https://twitter.com/batazor">
                <FontAwesomeIcon className="social-buttons" icon={faTwitter} />
              </Link>

              <Link href="https://www.linkedin.com/in/batazor/">
                <FontAwesomeIcon className="social-buttons" icon={faLinkedinIn} />
              </Link>
            </div>
          </article>
        </div>
      </body>
    </Fragment>
  )
}

export default Home
