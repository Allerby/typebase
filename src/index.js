import './styles/main.css';
import Router from './router';
import StoriesHtml from './pages/stories.html'; 

const router = new Router({
  root: '/'
});

class Typebase {
  link(e) {
    e.preventDefault;

    // Instead we should find the element by the 'fragment' element.
    let currentRouteFragment = router.getFragment()
    let previousRouteDom = document.getElementsByTagName(currentRouteFragment).item(0);

    if (previousRouteDom && previousRouteDom.innerHTML) {
      previousRouteDom.innerHTML = "";
    }
    router.navigate(`${e.target.dataset.route}`)
  }
}

let links = document.body.getElementsByTagName('a');
let application = new Typebase;
let linkArray = Array.from(links)

linkArray.forEach(function (el) {
  el.addEventListener('click', application.link);
})

let render = (html) => {
  // In order to know where to render, we require the user to create a top level web component that also
  // acts as the fragment for rendering and un-rendering the nested dom.
  let currentRouteFragment = router.getFragment()
  let renderFragment = document.getElementsByTagName(currentRouteFragment).item(0);
  if (renderFragment) {
    renderFragment.innerHTML = html;
  }
}

router
  .add(/stories/, () => {
    render(StoriesHtml);
  })
  .add(/story\/(.*)/, (id) => {
    alert(`story: ${id}`);
  })
  .add('', () => {
    // general controller
    console.log('I should be logged every time');
  });