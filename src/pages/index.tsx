import { api } from 'lib/ApolloClient';
import { gql } from '@apollo/client';

export default function Home() {
  return (
    <div className='h-screen'>
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
        }
      }
    `,
  })

  console.log(data);

  return {
    props: {
      members: data,
    }
  };
}

