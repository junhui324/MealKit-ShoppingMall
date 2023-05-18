function createFooter() {
  const footer = document.createElement('footer');
  footer.className = `w-full mx-auto color-sec md:py-6 mt-20`;
  footer.innerHTML = `<div class="w-full max-w-screen-xl mx-auto p-4 md:py-5 text-color-pri">
    <div class="sm:flex sm:items-center sm:justify-between text-color-pri">
      <a href="/index.html" class="flex items-center mb-2 sm:mb-0">
        <img
          src="/src/img/omc_logo_white.png"
          class="h-12 bg-tr"
          alt="ohmechu-logo"
        />
      </a>
      <div
        class="flex-col mb-3 text-sm font-medium sm:mb-0 bg-tr text-color-pri"
      >
        <p class="mr-1 flex-shrink-0">
          Gitlab-FrontEnd :<a
            href="https://kdt-gitlab.elice.io/sw_track/class_04/web_project/team17/ohmechu"
            target="_blank"
            >🧑🏻‍💻</a
          >
        </p>

        <p class="mr-1 flex-shrink-0">
          Gitlab-BackEnd :<a
            href="https://kdt-gitlab.elice.io/sw_track/class_04/web_project/team17/ohmechu-be"
            target="_blank
                  "
            >👩🏻‍💻⚙️</a
          >
        </p>
      </div>
    </div>
    <hr class="my-4 border-pri sm:mx-auto lg:my-5" />
    <span class="block text-sm text-color-pri text-left">OHMECHU</span
    ><span class="block text-sm text-color-pri text-left">운영시간 : 평일 10:00 ~ 18:00(점심시간 12:00 ~ 13:00)</span>
    <span class="block text-sm text-color-pri text-right"> <p class="block text-sm text-color-pri text-right">조정현 wjstkwhwjdgus@gmail.com</p>
      <p class="block text-sm text-color-pri text-right">이주영 1004ljy980@gmail.com</p>
      <p class="block text-sm text-color-pri text-right">이채연 9v.veu.v@gmail.com</p>
      <p class="block text-sm text-color-pri text-right">이정은 leeju1009@gmail.com</p>
      <p class="block text-sm text-color-pri text-right">장준희 junhuijang00@gmail.com</p></span>
  </div>
     `;
  document.body.append(footer);
}
export { createFooter };
