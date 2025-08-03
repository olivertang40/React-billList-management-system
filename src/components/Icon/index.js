const Icon = ({type}) => {
    const url = `https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/${type}.svg`
  return (
    <img
      src= {url}
      alt="icon"
      style={{
        width: 20,
        height: 20,
      }}
      />
  )
}

export default Icon