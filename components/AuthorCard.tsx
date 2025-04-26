import Image from './Image'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import { RoughNotation } from 'react-rough-notation'

const AuthorCard = ({ content }) => {
  const {
    author,
    avatar,
    occupation,
    qualifications,
    email,
    devto,
    x,
    linkedin,
    github,
    location,
  } = siteMetadata
  return (
    <div>
      <div className="flex flex-row items-center justify-center space-x-2 pb-8">
        {avatar && (
          <div className="pr-2 xl:pr-4">
            <Image
              src={avatar}
              alt="avatar"
              width={224}
              height={224}
              className="h-48 w-48 min-w-48 rounded-full dark:border-2 dark:border-primary-400 md:h-52 md:w-52"
            />
          </div>
        )}
        <div>
          <h3 className="pb-2 pt-4  text-2xl font-bold leading-8 tracking-tight sm:text-3xl md:text-4xl">
            <RoughNotation
              type="underline"
              show={true}
              color="#FFb900"
              animationDelay={1400}
              animationDuration={1200}
            >
              {author}
            </RoughNotation>
          </h3>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">{occupation}</div>
          <div className="md:text-md text-base text-primary-500 dark:text-primary-400">
            {qualifications}
          </div>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">{location}</div>
          <div className="flex space-x-3 pt-6">
            <SocialIcon kind="mail" href={`mailto:${email}`} />
            <SocialIcon kind="devto" href={devto} />
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="x" href={x} />
          </div>
        </div>
      </div>
      <div className="flex max-w-full flex-col">
        <div className="prose max-w-full pb-8 pt-10 dark:prose-invert xl:text-xl">
          <p>
            Yes, I used AI to help polish this portfolio - because who wouldn't want to leverage the
            power of AI? But when it comes to my actual work - securing systems, stopping threats,
            and automating defenses, that’s all me! No AI is pulling off what I do!
          </p>
          <p>
            I'm a dedicated Senior Security Engineer focused on safeguarding enterprise applications
            and cloud environments through risk assessments and innovative security solutions.
          </p>
          <div className="py-4">
            <span className="m-2 inline-block rounded-full bg-teal-200 px-2 py-1 text-sm text-teal-900">
              Incident Response
            </span>
            <span className="m-2 inline-block rounded-full  bg-indigo-200 px-2 py-1 text-sm text-indigo-900">
              Cloud Security
            </span>
            <span className="m-2 inline-block rounded-full  bg-blue-200 px-2 py-1 text-sm text-blue-900">
              SecOps
            </span>
            <span className="m-2 inline-block rounded-full  bg-purple-200 px-2 py-1 text-sm text-purple-900">
              HITRUST | PCI | SOC2 | HIPAA
            </span>
            <span className="m-2 inline-block rounded-full  bg-red-200 px-2 py-1 text-sm text-red-900">
              Fraud Prevention
            </span>
            <span className="m-2 inline-block rounded-full  bg-green-200 px-2 py-1 text-sm text-green-900">
              Threat Intelligence Gathering
            </span>
            <span className="m-2 inline-block rounded-full  bg-orange-200 px-2 py-1 text-sm text-orange-900">
              Security Architecture
            </span>
            <span className="m-2 inline-block rounded-full  bg-fuchsia-200 px-2 py-1 text-sm text-fuchsia-900">
              Vulnerability Assessment
            </span>
            <span className="m-2 inline-block rounded-full  bg-lime-200 px-2 py-1 text-sm text-lime-900">
              Third Party Risk Management
            </span>
            <span className="m-2 inline-block rounded-full  bg-amber-200 px-2 py-1 text-sm text-amber-900">
              Compliance Automation
            </span>
            <span className="m-2 inline-block rounded-full  bg-cyan-200 px-2 py-1 text-sm text-cyan-900">
              Endpoint Security
            </span>
            <span className="m-2 inline-block rounded-full  bg-rose-200 px-2 py-1 text-sm text-rose-900">
              Security Awareness Training
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorCard
