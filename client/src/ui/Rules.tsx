import {Disclosure} from '@headlessui/react'
import {MinusSmallIcon, PlusSmallIcon} from '@heroicons/react/24/outline'
import { PhoneIcon } from '@heroicons/react/24/outline'

const RULES = [
    {
        header: "Game",
        textDir: "ltr",
        ruleStatement:
            "Match Result prediction game. You predict the result of the match and earn points. The more accurate your prediction, the more points you earn.",
    },
    {
        header: 'Predict',
        textDir: "ltr",
        ruleStatement:
            'You need to register and login to play the game. Once you are logged in, you can go to Today Matches page and start predicting. You need to predict before the match starts. You can predict only once for a match.' +
            'Make sure of your prediction before you submit. You cannot change your prediction once you submit.',
    },
    {
        header: 'Score Calculation',
        textDir: "ltr",
        ruleStatement:
            'You earn points for each correct prediction.  group stage matches - 1 point, round of 16 - 2 points, quarter finals - 3 points, semi finals - 4 points, finals - 5 points. ',
    },
    {
        header: 'Bouns points',
        textDir: "ltr",
        ruleStatement: "You get double the points if you predict a side with less than or equal 25% of votes & Triple the points if you predict a side with less than or equal 10% of votes."
    },
    {
        header: "Score Calculation Time",
        textDir: "ltr",
        ruleStatement: "Score calculation happens after the match is finished or at the end of the day. You can see the score in the leaderboard page."
    },{
        header: "Arabic",
        rtl: 'rtl',
        ruleStatement: `
        رجالة 24 عارفين الي فيها
انما بالنسبة للباقي 
الموضوع كله انك بتتوقع الفريق الي هيكسب بس ياما team a او team b او تعادل

لو توقعك صح بتاخد نقطة لو لا مش بتاخد حاجة
بس النقطة دي بتضعاف علي حسب الماتش يعني : 
دور المجموعات نقطة
دور ال ١٦ نقطتين
دور ال ٨  ٣ نقط
دور ال ٤ ٤ نقط
و الفاينال ب ٥ 

في درجات بونص .. طب ازاي؟ 

الdouble لو توقعك صح و انت مختار فريق ثد او اقل من ٢٥% من الي الناس مختارينه
و الtriple لو اقل من 10%

يعني ايه؟ يعني لو مصر بتلعب و كلنا اختارنا مصر و في مجموعة اختارت موزانبيق و كان عددهم  قد او اقل من ٢٥% او ١٠% من توتال الاصوات بياخدو بونص

طبعا مش لازم اقول ان الvote نهائي يعني لو عملته مرة لازم تكون متاكد منه و مفيش تعديل 
و الvoting بيقفل لوحده اول مالماتش يبدء .. ماتشات اليوم بتظهر لوحدها اوتوماتيك المفروض الساعة ١٢ بليل و اليوم الي قبله بتتشال

عشان الشفافية طبعا تقدرو تشوفو مين صوت لمين في الprediction page و النسب 😼

Enjoy 

* لو في حاجة في الويسايت تعبانة في الresponse time دة عشان احنا فقرا و ال hosting بتاعنا ببلاش بس * 😂`
    }
]

export default function Rules() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-8 sm:py-8 lg:px-8 lg:py-10">
                <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Game Rules</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        {RULES.map((rule) => (
                            <Disclosure as="div" key={rule.header} className="pt-6">
                                {({open}) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button
                                                className="flex w-full items-start justify-between text-left text-gray-900">
                                                <span
                                                    className="text-base font-semibold leading-7">{rule.header}</span>
                                                <span className="ml-6 flex h-7 items-center">
                          {open ? (
                              <MinusSmallIcon className="h-6 w-6" aria-hidden="true"/>
                          ) : (
                              <PlusSmallIcon className="h-6 w-6" aria-hidden="true"/>
                          )}
                        </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                            <p dir={rule.rtl} className="text-base leading-7 text-gray-600">{rule.ruleStatement}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
                <div className={"flex justify-center my-10"}>
                    <div className={"flex-col"}>
                        <div className={"text-center"}>
                            الشكاوى
                        </div>
                        <div className={"flex gap-x-3"}>
                            <PhoneIcon className={"h-5 w-5 "} aria-hidden="true" />
                            <p>900 804 304</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
