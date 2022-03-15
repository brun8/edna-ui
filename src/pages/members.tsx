import { gql } from '@apollo/client';
import { FiMail } from 'react-icons/fi';
import { GrGithub, GrLinkedinOption } from 'react-icons/gr';
import Link from 'next/link';

import { api } from 'lib/ApolloClient';


type Member = {
  id: string;
  name: string;
  quote: string;
  email: string;
  github: string;
  linkedin: string;
  avatar: { publicUrl: string };
  tags: Tag[];
}

type Tag = {
  id: string;
  name: string;
}

type MembersProps = {
  members: Member[];
  tags: Tag[];
}

export default function Home({members, tags}: MembersProps) {
  console.log(tags);
  return (
    <div className='h-screen bg-background flex justify-center items-start gap-12 p-16'>
      {members.map((member) => (
        <div
          className='border-2 border-black p-5
            flex flex-col gap-6 items-center max-w-sm
            rounded-lg w-96
            bg-custom-gray-blue
          '
          key={member.id}
        >
          <div className='rounded-full overflow-hidden border-2 border-black'>
            <img src={member.avatar?.publicUrl} alt="" className='rounded-full h-28 w-28'/>
          </div>
          <div className='flex flex-col text-center'>
            <h1 className='font-semibold text-2xl'>
              {member.name}
            </h1>
            <p className='text-sm italic text-custom-gray m-0'>
              {member.quote}
            </p>
          </div>
          <div id='tags container' className='flex gap-4'>
            {member.tags.map((tag) => (
              <div
                key={tag.id}
                className='bg-custom-green px-2 border-2 border-black rounded-md'
              >
                {tag.name}
              </div>
            ))}
          </div>
          <div className='flex gap-8'>
              <div className='cursor-pointer'>
                <Link href={member.linkedin}>
                  <GrLinkedinOption color='black' size={20}/>
                </Link>
              </div>
              <div className='cursor-pointer'>
                <Link href={member.github}>
                  <GrGithub color='black' size={20}/>
                </Link>
              </div>
              <div className='cursor-pointer'>
                <Link href={`mailto:${member.email}`}>
                  <FiMail color='black' size={20}/>
                </Link>
              </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {

  const { data } = await api.query({
    query: gql`
      query allMembers {
        members {
          id
          name
          quote
          avatar {
            publicUrl
          }
          email
          github
          linkedin
          tags {
            id
            name
          }
        }
        tags {
          id
          name
        }
      }
    `,
  })

  console.log(data);
  return {
    props: {
      members: data.members,
      tags: data.tags,
    }
  };
}

