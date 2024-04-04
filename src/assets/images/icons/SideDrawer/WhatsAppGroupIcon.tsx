const SvgComponent = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={14} fill="none">
    <path
      fill={color}
      d="M0 13.5v-2.156c0-.403.098-.773.293-1.111.195-.338.465-.608.809-.811A10.909 10.909 0 0 1 6.75 7.875c1.031 0 2.02.133 2.965.398.945.266 1.84.649 2.683 1.149.344.203.614.473.809.811.195.338.293.708.293 1.11V13.5H0Zm15.188 0v-2.156c0-.656-.153-1.266-.458-1.828a3.958 3.958 0 0 0-1.23-1.383c.61.125 1.2.293 1.77.504a9.48 9.48 0 0 1 1.628.785A2.219 2.219 0 0 1 18 11.344V13.5h-2.813ZM6.75 6.75c-.938 0-1.734-.328-2.39-.984-.657-.657-.985-1.454-.985-2.391 0-.938.328-1.734.984-2.39C5.016.327 5.813 0 6.75 0c.938 0 1.734.328 2.39.984.657.657.985 1.454.985 2.391 0 .938-.328 1.734-.984 2.39-.657.657-1.454.985-2.391.985Zm7.875-3.375c0 .938-.328 1.734-.984 2.39-.657.657-1.454.985-2.391.985-.125 0-.242-.004-.352-.012a2.061 2.061 0 0 1-.351-.058c.39-.453.7-.957.926-1.512.226-.555.34-1.152.34-1.793 0-.64-.114-1.238-.34-1.793A5.466 5.466 0 0 0 10.547.07c.125-.03.242-.05.351-.058A4.95 4.95 0 0 1 11.25 0c.938 0 1.734.328 2.39.984.657.657.985 1.454.985 2.391ZM1.687 11.813h10.126v-.47a.545.545 0 0 0-.258-.468 10.07 10.07 0 0 0-2.32-.973 9.207 9.207 0 0 0-2.485-.34c-.844 0-1.672.11-2.484.329a9.177 9.177 0 0 0-2.32.984.508.508 0 0 0-.258.467v.47Zm5.068-6.75c.465 0 .862-.166 1.19-.498.328-.331.492-.73.492-1.195 0-.465-.165-.862-.497-1.19a1.638 1.638 0 0 0-1.195-.493c-.465 0-.862.166-1.19.498-.328.331-.492.73-.492 1.195 0 .465.165.862.497 1.19.331.328.73.492 1.195.492Z"
    />
  </svg>
);
export default SvgComponent;