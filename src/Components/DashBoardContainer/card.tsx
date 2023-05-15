import { useEffect, useState } from "react";
import { getGitAuthToken } from "../../Service/githubAuth";
import { getUserDetails } from "../../Service/getUserDetails";
import { getRepos } from "../../Service/getRepos";
import { useRouter } from "next/router";
import styles from "./dashboard.module.scss";

const Card = () => {
    const router = useRouter();
    const [isAuthTrigger, setIsAuthTriggr] = useState(false);
    const [githubAuthToken, setgitHubAuthToken] = useState(null);
    const [userDetails, setUserDetails] = useState<any>([]);
    const [repoList, setRepoList] = useState<any>([]);
    const code = router.query.code;

    const goToGitHub = () => {
        const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
        const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;
        router.push(url);
        setTimeout(() => {
            setIsAuthTriggr(true);
        }, 1000);
    };

    const getAuthToken = async (code: any) => {
        try {
            const authToken: any = await getGitAuthToken(code);
            localStorage.setItem("authToken", authToken.token);
            setgitHubAuthToken(authToken.token);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUserData = async (authToken: any) => {
        const response: any = await getUserDetails(authToken);
        setUserDetails(response?.data ?? {});
        const username = response?.data?.login ?? "";
        const result: any = await getRepos(username);
        setRepoList(result?.data);
    };

    useEffect(() => {
        if (code) {
            if (!isAuthTrigger) {
                getAuthToken(code);
                setIsAuthTriggr(true);
            }
        }
    }, [code]);

    useEffect(() => {
        if (githubAuthToken) {
            fetchUserData(githubAuthToken);
        }
    }, [githubAuthToken]);

    return (
        <div className={styles.card}>
            <div className={styles.details_container}>
                <div className={styles.image_title}>
                    <img src={userDetails?.avatar_url} />
                    <span>{userDetails?.name}</span>
                </div>
                {repoList?.length ? (
                    <div className={styles.repo_list}>
                        {repoList?.map((repo: any) => {
                            return (
                                <div key={repo?.id}>
                                    <span>{repo.full_name}</span>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
            <button
                className={styles.button}
                onClick={goToGitHub}
                disabled={githubAuthToken ? true : false}
            >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/800px-GitHub_Invertocat_Logo.svg.png" />
                {!githubAuthToken
                    ? "Connect to Github"
                    : "Connected With Github"}
            </button>
        </div>
    );
};
export default Card;
