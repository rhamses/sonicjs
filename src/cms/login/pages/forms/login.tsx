import {Alert} from "../components/alert"
export const loginForm = (props) => {
  let alertObj;
  if (props) {
    const { isError, errorMsg } = props
    if (isError) {
      alertObj = <Alert color="red" text={errorMsg} />
    }
  }
  return (
    <>
      {alertObj}
      <form
        method="POST"
        class="bg-white border border-solid border-gray-300 px-6 py-7"
      >
        <div class="mb-5">
          <label for="username" class="block">Username or email address</label>
          <input
            type="text"
            id="username"
            name="username"
            class="border border-gray-400 rounded-md p-2 text-xl w-full"
            required
          />
        </div>
        <div class="mb-5">
          <label for="password" class="block">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            class="border border-gray-400 rounded-md p-2 text-xl w-full"
            required
          />
        </div>
        <div class="flex justify-between">
          <div>
            <input
              type="checkbox"
              name="rememberme"
              id="rememberme"
              value="forever"
              class="rounded"
            />
            <label for="rememberme" class="text-sm pl-2">Remember me</label>
          </div>
          <button
            type="submit"
            class="bg-sky-700 px-3 py-2 rounded text-white text-sm"
          >
            Log in
          </button>
        </div>
      </form>
      <a class="block text-sm pl-5 pt-4 text-gray-600" href="/login/recovery"
        >Lost your password?</a
      >
    </>
  )
}