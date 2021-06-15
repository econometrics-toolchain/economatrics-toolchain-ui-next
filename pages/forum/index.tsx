import { Divider } from "@material-ui/core";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Layout } from "../../components/forum/layout";
import { Post } from "../../components/forum/Post";
import { httpClient } from "../../utils/services";
import { MySheetsSkeleton } from "../../components/other/loaders";
import { CircularProgress } from '@material-ui/core';

export default function Forum({ example }) {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        httpClient.get('https://gretljestslaby.pythonanywhere.com/api/posts/')
            .then(resp => resp.data)
            .then(resp => {
                setPosts(resp)
            })
    }, [])

    return (
        <>
            <Head>
                <title>GEST | forum</title>
            </Head>
            <Layout>
                <div style={{ maxWidth: '800px', margin: 'auto auto 50px' }}>
                    <h1>Top questions</h1>
                    <Divider />
                    {
                        posts.map((post, index) => (
                            <>
                                <Post post={post} index={index + 1} />
                                <Divider />
                            </>
                        ))
                    }

                </div>
            </Layout>

        </>
    )
}
