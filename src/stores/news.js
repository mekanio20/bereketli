import { defineStore } from "pinia";

export const useNewsStore = defineStore("news", {
  state: () => ({
    newsData: [
      {
        id: 1,
        image: "/images/new_1.png",
        date: "02.09.2025 - 12:05",
        title: "Ýük daşamakda has çalt we ygtybarly hyzmatlar hödürlenyär",
        content: `
            Täze desga ýükleri gaýtadan işlemekde netijeliligi ýokarlandyrmaga we Merkezi Aziýa boýunça eltip bermek wagtyny gysaltmaga ýardam eder. Kompaniýanyň wekilleriniň belleýşine görä, merkez döwrebap gözegçilik tehnologiýalary hem-de awtomatlaşdyrylan ammarlama ulgamlary bilen enjamlaşdyryldy. Bu bolsa müşderilere ýüklere onlaýn görnüşde hakyky wagtda gözegçilik etmäge mümkinçilik berýär.
            Kompaniýa, aýratyn-da, Türkmenistanyň Gazagystan, Eýran we Özbegistan bilen birleşdirýän ugurlarynda multimodal gatnawlara bolan islegiň yzygiderli artýandygyny habar berdi. Geljek ýyl üçin meýilnamalaryň arasynda konteýnerli otly hyzmatlaryny giňeltmek we uglewodorod zyňyndylaryny azaltmaga gönükdirilen ekologiýa taýdan arassa ulag çözgütlerini ornaşdyrmak bar.
            “Türkmenistanyň geografik taýdan amatly ýerleşmegi bize Aziýa bilen Ýewropanyň arasyndaky söwda geçelgelerini pugtalandyrmak üçin aýratyn mümkinçilik berýär” diýip, kompaniýanyň wekili belledi. “Biziň maksadymyz logistika hyzmatlaryny has çalt, akylly we ynamdar görnüşde hödürlemekden ybarat.”
            Täze desga ýükleri gaýtadan işlemekde netijeliligi ýokarlandyrmaga we Merkezi Aziýa boýunça eltip bermek wagtyny gysaltmaga ýardam eder. Kompaniýanyň wekilleriniň belleýşine görä, merkez döwrebap gözegçilik tehnologiýalary hem-de awtomatlaşdyrylan ammarlama ulgamlary bilen enjamlaşdyryldy. Bu bolsa müşderilere ýüklere onlaýn görnüşde hakyky wagtda gözegçilik etmäge mümkinçilik berýär.
            Kompaniýa, aýratyn-da, Türkmenistanyň Gazagystan, Eýran we Özbegistan bilen birleşdirýän ugurlarynda multimodal gatnawlara bolan islegiň yzygiderli artýandygyny habar berdi. Geljek ýyl üçin meýilnamalaryň arasynda konteýnerli otly hyzmatlaryny giňeltmek we uglewodorod zyňyndylaryny azaltmaga gönükdirilen ekologiýa taýdan arassa ulag çözgütlerini ornaşdyrmak bar.
            “Türkmenistanyň geografik taýdan amatly ýerleşmegi bize Aziýa bilen Ýewropanyň arasyndaky söwda geçelgelerini pugtalandyrmak üçin aýratyn mümkinçilik berýär” diýip, kompaniýanyň wekili belledi. “Biziň maksadymyz logistika hyzmatlaryny has çalt, akylly we ynamdar görnüşde hödürlemekden ybarat.”
        `,
        related_news: [
          {
            id: 2,
            image: "/images/new_2.png",
            date: "02.09.2025 - 12:05",
            title: "Serhetara ýük daşamakda täze mümkinçilikler açyldy",
          },
          {
            id: 3,
            image: "/images/new_3.png",
            date: "02.09.2025 - 12:05",
            title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
          },
          {
            id: 4,
            image: "/images/new_4.png",
            date: "02.09.2025 - 12:05",
            title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
          },
        ],
      },
      {
        id: 2,
        image: "/images/new_2.png",
        date: "02.09.2025 - 12:05",
        title: "Serhetara ýük daşamakda täze mümkinçilikler açyldy",
        content: `
            Täze desga ýükleri gaýtadan işlemekde netijeliligi ýokarlandyrmaga we Merkezi Aziýa boýunça eltip bermek wagtyny gysaltmaga ýardam eder. Kompaniýanyň wekilleriniň belleýşine görä, merkez döwrebap gözegçilik tehnologiýalary hem-de awtomatlaşdyrylan ammarlama ulgamlary bilen enjamlaşdyryldy. Bu bolsa müşderilere ýüklere onlaýn görnüşde hakyky wagtda gözegçilik etmäge mümkinçilik berýär.
            Kompaniýa, aýratyn-da, Türkmenistanyň Gazagystan, Eýran we Özbegistan bilen birleşdirýän ugurlarynda multimodal gatnawlara bolan islegiň yzygiderli artýandygyny habar berdi. Geljek ýyl üçin meýilnamalaryň arasynda konteýnerli otly hyzmatlaryny giňeltmek we uglewodorod zyňyndylaryny azaltmaga gönükdirilen ekologiýa taýdan arassa ulag çözgütlerini ornaşdyrmak bar.
            “Türkmenistanyň geografik taýdan amatly ýerleşmegi bize Aziýa bilen Ýewropanyň arasyndaky söwda geçelgelerini pugtalandyrmak üçin aýratyn mümkinçilik berýär” diýip, kompaniýanyň wekili belledi. “Biziň maksadymyz logistika hyzmatlaryny has çalt, akylly we ynamdar görnüşde hödürlemekden ybarat.”
            Täze desga ýükleri gaýtadan işlemekde netijeliligi ýokarlandyrmaga we Merkezi Aziýa boýunça eltip bermek wagtyny gysaltmaga ýardam eder. Kompaniýanyň wekilleriniň belleýşine görä, merkez döwrebap gözegçilik tehnologiýalary hem-de awtomatlaşdyrylan ammarlama ulgamlary bilen enjamlaşdyryldy. Bu bolsa müşderilere ýüklere onlaýn görnüşde hakyky wagtda gözegçilik etmäge mümkinçilik berýär.
            Kompaniýa, aýratyn-da, Türkmenistanyň Gazagystan, Eýran we Özbegistan bilen birleşdirýän ugurlarynda multimodal gatnawlara bolan islegiň yzygiderli artýandygyny habar berdi. Geljek ýyl üçin meýilnamalaryň arasynda konteýnerli otly hyzmatlaryny giňeltmek we uglewodorod zyňyndylaryny azaltmaga gönükdirilen ekologiýa taýdan arassa ulag çözgütlerini ornaşdyrmak bar.
            “Türkmenistanyň geografik taýdan amatly ýerleşmegi bize Aziýa bilen Ýewropanyň arasyndaky söwda geçelgelerini pugtalandyrmak üçin aýratyn mümkinçilik berýär” diýip, kompaniýanyň wekili belledi. “Biziň maksadymyz logistika hyzmatlaryny has çalt, akylly we ynamdar görnüşde hödürlemekden ybarat.”
        `,
        related_news: [
          {
            id: 2,
            image: "/images/new_2.png",
            date: "02.09.2025 - 12:05",
            title: "Serhetara ýük daşamakda täze mümkinçilikler açyldy",
          },
          {
            id: 3,
            image: "/images/new_3.png",
            date: "02.09.2025 - 12:05",
            title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
          },
          {
            id: 4,
            image: "/images/new_4.png",
            date: "02.09.2025 - 12:05",
            title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
          },
        ],
      },
      {
        id: 3,
        image: "/images/new_3.png",
        date: "02.09.2025 - 12:05",
        title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
        content: `
            Täze desga ýükleri gaýtadan işlemekde netijeliligi ýokarlandyrmaga we Merkezi Aziýa boýunça eltip bermek wagtyny gysaltmaga ýardam eder. Kompaniýanyň wekilleriniň belleýşine görä, merkez döwrebap gözegçilik tehnologiýalary hem-de awtomatlaşdyrylan ammarlama ulgamlary bilen enjamlaşdyryldy. Bu bolsa müşderilere ýüklere onlaýn görnüşde hakyky wagtda gözegçilik etmäge mümkinçilik berýär.
            Kompaniýa, aýratyn-da, Türkmenistanyň Gazagystan, Eýran we Özbegistan bilen birleşdirýän ugurlarynda multimodal gatnawlara bolan islegiň yzygiderli artýandygyny habar berdi. Geljek ýyl üçin meýilnamalaryň arasynda konteýnerli otly hyzmatlaryny giňeltmek we uglewodorod zyňyndylaryny azaltmaga gönükdirilen ekologiýa taýdan arassa ulag çözgütlerini ornaşdyrmak bar.
            “Türkmenistanyň geografik taýdan amatly ýerleşmegi bize Aziýa bilen Ýewropanyň arasyndaky söwda geçelgelerini pugtalandyrmak üçin aýratyn mümkinçilik berýär” diýip, kompaniýanyň wekili belledi. “Biziň maksadymyz logistika hyzmatlaryny has çalt, akylly we ynamdar görnüşde hödürlemekden ybarat.”
            Täze desga ýükleri gaýtadan işlemekde netijeliligi ýokarlandyrmaga we Merkezi Aziýa boýunça eltip bermek wagtyny gysaltmaga ýardam eder. Kompaniýanyň wekilleriniň belleýşine görä, merkez döwrebap gözegçilik tehnologiýalary hem-de awtomatlaşdyrylan ammarlama ulgamlary bilen enjamlaşdyryldy. Bu bolsa müşderilere ýüklere onlaýn görnüşde hakyky wagtda gözegçilik etmäge mümkinçilik berýär.
            Kompaniýa, aýratyn-da, Türkmenistanyň Gazagystan, Eýran we Özbegistan bilen birleşdirýän ugurlarynda multimodal gatnawlara bolan islegiň yzygiderli artýandygyny habar berdi. Geljek ýyl üçin meýilnamalaryň arasynda konteýnerli otly hyzmatlaryny giňeltmek we uglewodorod zyňyndylaryny azaltmaga gönükdirilen ekologiýa taýdan arassa ulag çözgütlerini ornaşdyrmak bar.
            “Türkmenistanyň geografik taýdan amatly ýerleşmegi bize Aziýa bilen Ýewropanyň arasyndaky söwda geçelgelerini pugtalandyrmak üçin aýratyn mümkinçilik berýär” diýip, kompaniýanyň wekili belledi. “Biziň maksadymyz logistika hyzmatlaryny has çalt, akylly we ynamdar görnüşde hödürlemekden ybarat.”
        `,
        related_news: [
          {
            id: 2,
            image: "/images/new_2.png",
            date: "02.09.2025 - 12:05",
            title: "Serhetara ýük daşamakda täze mümkinçilikler açyldy",
          },
          {
            id: 3,
            image: "/images/new_3.png",
            date: "02.09.2025 - 12:05",
            title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
          },
          {
            id: 4,
            image: "/images/new_4.png",
            date: "02.09.2025 - 12:05",
            title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
          },
        ],
      },
      {
        id: 4,
        image: "/images/new_4.png",
        date: "02.09.2025 - 12:05",
        title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
        content: `
            Täze desga ýükleri gaýtadan işlemekde netijeliligi ýokarlandyrmaga we Merkezi Aziýa boýunça eltip bermek wagtyny gysaltmaga ýardam eder. Kompaniýanyň wekilleriniň belleýşine görä, merkez döwrebap gözegçilik tehnologiýalary hem-de awtomatlaşdyrylan ammarlama ulgamlary bilen enjamlaşdyryldy. Bu bolsa müşderilere ýüklere onlaýn görnüşde hakyky wagtda gözegçilik etmäge mümkinçilik berýär.
            Kompaniýa, aýratyn-da, Türkmenistanyň Gazagystan, Eýran we Özbegistan bilen birleşdirýän ugurlarynda multimodal gatnawlara bolan islegiň yzygiderli artýandygyny habar berdi. Geljek ýyl üçin meýilnamalaryň arasynda konteýnerli otly hyzmatlaryny giňeltmek we uglewodorod zyňyndylaryny azaltmaga gönükdirilen ekologiýa taýdan arassa ulag çözgütlerini ornaşdyrmak bar.
            “Türkmenistanyň geografik taýdan amatly ýerleşmegi bize Aziýa bilen Ýewropanyň arasyndaky söwda geçelgelerini pugtalandyrmak üçin aýratyn mümkinçilik berýär” diýip, kompaniýanyň wekili belledi. “Biziň maksadymyz logistika hyzmatlaryny has çalt, akylly we ynamdar görnüşde hödürlemekden ybarat.”
            Täze desga ýükleri gaýtadan işlemekde netijeliligi ýokarlandyrmaga we Merkezi Aziýa boýunça eltip bermek wagtyny gysaltmaga ýardam eder. Kompaniýanyň wekilleriniň belleýşine görä, merkez döwrebap gözegçilik tehnologiýalary hem-de awtomatlaşdyrylan ammarlama ulgamlary bilen enjamlaşdyryldy. Bu bolsa müşderilere ýüklere onlaýn görnüşde hakyky wagtda gözegçilik etmäge mümkinçilik berýär.
            Kompaniýa, aýratyn-da, Türkmenistanyň Gazagystan, Eýran we Özbegistan bilen birleşdirýän ugurlarynda multimodal gatnawlara bolan islegiň yzygiderli artýandygyny habar berdi. Geljek ýyl üçin meýilnamalaryň arasynda konteýnerli otly hyzmatlaryny giňeltmek we uglewodorod zyňyndylaryny azaltmaga gönükdirilen ekologiýa taýdan arassa ulag çözgütlerini ornaşdyrmak bar.
            “Türkmenistanyň geografik taýdan amatly ýerleşmegi bize Aziýa bilen Ýewropanyň arasyndaky söwda geçelgelerini pugtalandyrmak üçin aýratyn mümkinçilik berýär” diýip, kompaniýanyň wekili belledi. “Biziň maksadymyz logistika hyzmatlaryny has çalt, akylly we ynamdar görnüşde hödürlemekden ybarat.”
        `,
        related_news: [
          {
            id: 2,
            image: "/images/new_2.png",
            date: "02.09.2025 - 12:05",
            title: "Serhetara ýük daşamakda täze mümkinçilikler açyldy",
          },
          {
            id: 3,
            image: "/images/new_3.png",
            date: "02.09.2025 - 12:05",
            title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
          },
          {
            id: 4,
            image: "/images/new_4.png",
            date: "02.09.2025 - 12:05",
            title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
          },
        ],
      },
      {
        id: 5,
        image: "/images/new_5.png",
        date: "02.09.2025 - 12:05",
        title: "Serhetara ýük daşamakda täze mümkinçilikler açyldy",
        content: `
            Täze desga ýükleri gaýtadan işlemekde netijeliligi ýokarlandyrmaga we Merkezi Aziýa boýunça eltip bermek wagtyny gysaltmaga ýardam eder. Kompaniýanyň wekilleriniň belleýşine görä, merkez döwrebap gözegçilik tehnologiýalary hem-de awtomatlaşdyrylan ammarlama ulgamlary bilen enjamlaşdyryldy. Bu bolsa müşderilere ýüklere onlaýn görnüşde hakyky wagtda gözegçilik etmäge mümkinçilik berýär.
            Kompaniýa, aýratyn-da, Türkmenistanyň Gazagystan, Eýran we Özbegistan bilen birleşdirýän ugurlarynda multimodal gatnawlara bolan islegiň yzygiderli artýandygyny habar berdi. Geljek ýyl üçin meýilnamalaryň arasynda konteýnerli otly hyzmatlaryny giňeltmek we uglewodorod zyňyndylaryny azaltmaga gönükdirilen ekologiýa taýdan arassa ulag çözgütlerini ornaşdyrmak bar.
            “Türkmenistanyň geografik taýdan amatly ýerleşmegi bize Aziýa bilen Ýewropanyň arasyndaky söwda geçelgelerini pugtalandyrmak üçin aýratyn mümkinçilik berýär” diýip, kompaniýanyň wekili belledi. “Biziň maksadymyz logistika hyzmatlaryny has çalt, akylly we ynamdar görnüşde hödürlemekden ybarat.”
            Täze desga ýükleri gaýtadan işlemekde netijeliligi ýokarlandyrmaga we Merkezi Aziýa boýunça eltip bermek wagtyny gysaltmaga ýardam eder. Kompaniýanyň wekilleriniň belleýşine görä, merkez döwrebap gözegçilik tehnologiýalary hem-de awtomatlaşdyrylan ammarlama ulgamlary bilen enjamlaşdyryldy. Bu bolsa müşderilere ýüklere onlaýn görnüşde hakyky wagtda gözegçilik etmäge mümkinçilik berýär.
            Kompaniýa, aýratyn-da, Türkmenistanyň Gazagystan, Eýran we Özbegistan bilen birleşdirýän ugurlarynda multimodal gatnawlara bolan islegiň yzygiderli artýandygyny habar berdi. Geljek ýyl üçin meýilnamalaryň arasynda konteýnerli otly hyzmatlaryny giňeltmek we uglewodorod zyňyndylaryny azaltmaga gönükdirilen ekologiýa taýdan arassa ulag çözgütlerini ornaşdyrmak bar.
            “Türkmenistanyň geografik taýdan amatly ýerleşmegi bize Aziýa bilen Ýewropanyň arasyndaky söwda geçelgelerini pugtalandyrmak üçin aýratyn mümkinçilik berýär” diýip, kompaniýanyň wekili belledi. “Biziň maksadymyz logistika hyzmatlaryny has çalt, akylly we ynamdar görnüşde hödürlemekden ybarat.”
        `,
        related_news: [
          {
            id: 2,
            image: "/images/new_2.png",
            date: "02.09.2025 - 12:05",
            title: "Serhetara ýük daşamakda täze mümkinçilikler açyldy",
          },
          {
            id: 3,
            image: "/images/new_3.png",
            date: "02.09.2025 - 12:05",
            title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
          },
          {
            id: 4,
            image: "/images/new_4.png",
            date: "02.09.2025 - 12:05",
            title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
          },
        ],
      },
      {
        id: 6,
        image: "/images/new_6.png",
        date: "02.09.2025 - 12:05",
        title: "Ýük daşamakda has çalt we ygtybarly hyzmatlar hödürlenyär",
        content: `
            Täze desga ýükleri gaýtadan işlemekde netijeliligi ýokarlandyrmaga we Merkezi Aziýa boýunça eltip bermek wagtyny gysaltmaga ýardam eder. Kompaniýanyň wekilleriniň belleýşine görä, merkez döwrebap gözegçilik tehnologiýalary hem-de awtomatlaşdyrylan ammarlama ulgamlary bilen enjamlaşdyryldy. Bu bolsa müşderilere ýüklere onlaýn görnüşde hakyky wagtda gözegçilik etmäge mümkinçilik berýär.
            Kompaniýa, aýratyn-da, Türkmenistanyň Gazagystan, Eýran we Özbegistan bilen birleşdirýän ugurlarynda multimodal gatnawlara bolan islegiň yzygiderli artýandygyny habar berdi. Geljek ýyl üçin meýilnamalaryň arasynda konteýnerli otly hyzmatlaryny giňeltmek we uglewodorod zyňyndylaryny azaltmaga gönükdirilen ekologiýa taýdan arassa ulag çözgütlerini ornaşdyrmak bar.
            “Türkmenistanyň geografik taýdan amatly ýerleşmegi bize Aziýa bilen Ýewropanyň arasyndaky söwda geçelgelerini pugtalandyrmak üçin aýratyn mümkinçilik berýär” diýip, kompaniýanyň wekili belledi. “Biziň maksadymyz logistika hyzmatlaryny has çalt, akylly we ynamdar görnüşde hödürlemekden ybarat.”
            Täze desga ýükleri gaýtadan işlemekde netijeliligi ýokarlandyrmaga we Merkezi Aziýa boýunça eltip bermek wagtyny gysaltmaga ýardam eder. Kompaniýanyň wekilleriniň belleýşine görä, merkez döwrebap gözegçilik tehnologiýalary hem-de awtomatlaşdyrylan ammarlama ulgamlary bilen enjamlaşdyryldy. Bu bolsa müşderilere ýüklere onlaýn görnüşde hakyky wagtda gözegçilik etmäge mümkinçilik berýär.
            Kompaniýa, aýratyn-da, Türkmenistanyň Gazagystan, Eýran we Özbegistan bilen birleşdirýän ugurlarynda multimodal gatnawlara bolan islegiň yzygiderli artýandygyny habar berdi. Geljek ýyl üçin meýilnamalaryň arasynda konteýnerli otly hyzmatlaryny giňeltmek we uglewodorod zyňyndylaryny azaltmaga gönükdirilen ekologiýa taýdan arassa ulag çözgütlerini ornaşdyrmak bar.
            “Türkmenistanyň geografik taýdan amatly ýerleşmegi bize Aziýa bilen Ýewropanyň arasyndaky söwda geçelgelerini pugtalandyrmak üçin aýratyn mümkinçilik berýär” diýip, kompaniýanyň wekili belledi. “Biziň maksadymyz logistika hyzmatlaryny has çalt, akylly we ynamdar görnüşde hödürlemekden ybarat.”
        `,
        related_news: [
          {
            id: 2,
            image: "/images/new_2.png",
            date: "02.09.2025 - 12:05",
            title: "Serhetara ýük daşamakda täze mümkinçilikler açyldy",
          },
          {
            id: 3,
            image: "/images/new_3.png",
            date: "02.09.2025 - 12:05",
            title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
          },
          {
            id: 4,
            image: "/images/new_4.png",
            date: "02.09.2025 - 12:05",
            title: "Logistika hyzmatlarymyz täze ugurlar bilen giňeldi",
          },
        ],
      },
    ],
  }),
  actions: {
    getNewsById(id) {
      return this.newsData.find((news) => news.id === Number(id));
    },
  },
});