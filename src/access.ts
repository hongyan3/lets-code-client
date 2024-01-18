/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { LoginUser?: API.UserVO } | undefined) {
  const { LoginUser } = initialState ?? {};
  return {
    canAdmin: LoginUser && LoginUser.role === 2,
  };
}
