const Amitie = ({number}: { readonly number: number }) => {
    return (
        <svg style={{ width: "7vw", height: "auto" }} viewBox="0 0 160 172" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M97.9231 61.1999C87.2302 57.2208 80.6866 56.5918 68.4231 57.1999C40.455 85.2543 25.8291 101.493 5.4231 133.2C1.52549 133.327 -0.344677 170.719 21.4231 169.2C43.1909 167.681 41.4914 171.497 61.9231 166.2C82.3548 160.902 90.5685 163.049 108.923 166.2C125.237 169.971 133.358 170.278 146.923 169.2C154.52 161.172 156.179 154.548 155.423 139.7C138.425 109.056 126.645 91.8698 97.9231 61.1999Z"
                fill="#FDEDBA" stroke="#FBB944" strokeWidth="3"/>
            <path
                d="M50.1146 85C58.3356 78.4861 64.0897 75.364 79.1146 72C100.177 75.3945 107.409 78.7974 112.115 87.5C121.322 103.857 124.186 113.17 117.615 130.5C111.863 148.066 102.917 152.624 79.1146 153.5C57.2927 149.525 47.752 144.808 37.1146 130.5C33.9294 107.391 37.3627 97.8085 50.1146 85Z"
                fill="white"/>
            <path d="M21 34.4993C-0.500017 30.5 -8.00002 80.0001 21 80C50 80 42.5 38.4986 21 34.4993Z" fill="#FDEDBA"
                  stroke="#FBB944" strokeWidth="3"/>
            <path d="M134.5 33.5C113.5 42.5 114.5 81.5 142.5 81.5C170.5 81.5 155.5 24.5 134.5 33.5Z" fill="#FDEDBA"
                  stroke="#FBB944" strokeWidth="3"/>
            <path d="M108 2.50111C89.5 -2.49778 67.5 39.5021 95.5 48.001C123.5 56.5 126.5 7.5 108 2.50111Z"
                  fill="#FDEDBA"
                  stroke="#FBB944" strokeWidth="3"/>
            <path d="M56 3.00002C29 2.99997 33.0612 56.2359 59.5 50.9999C85.9388 45.7638 83 3.00006 56 3.00002Z"
                  fill="#FDEDBA" stroke="#FBB944" strokeWidth="3"/>
            <text x="76" y="130" fontSize="60" textAnchor="middle" fill="#CCAC86" fontFamily="Goudy Old Style"
                  fontWeight="bold">
                {number}
            </text>
        </svg>
    );
};

export default Amitie;