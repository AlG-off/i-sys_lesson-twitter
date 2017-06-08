import axios from 'axios';

(function() {
    axios.get('/wall-api')
        .then(res => {
            const { data } = res;
            createTitle(data.groups);
            createWallEntry(data.wall);
        });

    function createTitle(data) {
        const
            rootContainer = document.getElementById('root'),
            title = document.createElement('h3');

        title.innerHTML = data[0].name;
        title.classList.add('title-group');
        rootContainer.appendChild(title);
    }

    function createWallEntry(data) {
        const rootContainer = document.getElementById('root');

        data.slice(1).forEach(item => {
            const
                entry = document.createElement('div'),
                divContainer = document.createElement('div'),
                text = document.createElement('p');

            entry.classList.add('entry-group');
            text.innerHTML = item.text;

            divContainer.appendChild(text);

            if (item.attachments) {
                item.attachments.forEach(data => {
                    switch (data.type) {
                        case 'photo':
                            const imgElem = document.createElement('img');

                            imgElem.setAttribute('src', data.photo.src_big);
                            divContainer.appendChild(imgElem);
                            break;
                        case 'doc':
                            const aElem = document.createElement('a');

                            aElem.setAttribute('href', data.doc.url);
                            aElem.innerHTML = 'Link';
                            divContainer.appendChild(aElem);
                            break;
                        case 'link':
                            const linkElem = document.createElement('a');

                            linkElem.setAttribute('href', data.link.url);
                            linkElem.innerHTML = data.link.title;
                            divContainer.appendChild(linkElem);
                            break;
                    }
                });
            }

            entry.appendChild(divContainer);
            rootContainer.appendChild(entry);
        });
    }
}());
