'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Button, Divider } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

function page() {
    return (
        <>

            <div className="bg-blue-50">
                <div className="bg-gradient-to-r from-blue-950 to-blue-800">
                    <div className="container pb-3 mx-auto relative px-3">
                        <Header />
                    </div>
                </div>
                <div className="bg-blue-800 flex flex-col gap-4 text-white p-4 container mx-auto rounded-2xl my-10">
                    <h1 className='sm:text-4xl text-2xl'>دریافت طلای فیزیکی از بیرگرم</h1>
                    <div className='sm:w-1/12 w-1/6 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500'></div>
                    <p>طلا، دارایی ارزشمندی است و خرید طلای آب شده سرمایه‌گذاری سودآوری برای همه افراد محسوب می‌شود. شما به‌عنوان یک سرمایه‌گذار، می‌توانید طلای خریداری شده خود را مطابق با به‌روزترین استانداردها از بیرگرم و با ضمانت اصالت کالا و عیار دقیق دریافت کنید.</p>
                </div>
                <div className=" flex flex-col gap-5 text-black p-4 container mx-auto rounded-2xl mt-10">
                    <h1 className='sm:text-2xl text-lg font-bold text-blue-900'>مراحل دریافت فیزیکی طلا از بیرگرم</h1>
                    <div className='sm:w-1/12 w-1/6 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500'></div>
                    <div className='flex flex-wrap gap-5'>
                        <div className='flex gap-2 bg-white shadow-md p-3 py-6 rounded-lg sm:w-72 w-full'>
                            <Image width={34} height={34} src={"/icons/1.svg"} alt='' className='self-start' />
                            <div className='flex flex-col gap-2'>
                                <h6 className='font-semibold'>ثبت درخواست دریافت طلا
                                </h6>
                                <p className='text-sm'>در صورتی که مایل به دریافت فیزیکی طلای خریداری شده خود هستید، درخواست دریافت طلای خود را از بخش خدمات در اپلیکیشن بیرگرم ثبت کنی</p>
                            </div>
                        </div>
                        <div className='flex gap-2 sm:w-72 w-full bg-white shadow-md p-3 py-6 rounded-lg '>
                            <Image width={34} height={34} src={"/icons/2.svg"} alt='' className='self-start' />
                            <div className='flex flex-col gap-2'>
                                <h6 className='font-semibold'>ثبت درخواست دریافت طلا
                                </h6>
                                <p className='text-sm'>در صورتی که مایل به دریافت فیزیکی طلای خریداری شده خود هستید، درخواست دریافت طلای خود را از بخش خدمات در اپلیکیشن بیرگرم ثبت کنی</p>
                            </div>
                        </div>
                        <div className='flex gap-2 sm:w-72 w-full bg-white shadow-md px-3 py-6 rounded-lg '>
                            <Image width={34} height={34} src={"/icons/3.svg"} alt='' className='self-start' />
                            <div className='flex flex-col gap-2'>
                                <h6 className='font-semibold'>ثبت درخواست دریافت طلا
                                </h6>
                                <p className='text-sm'>در صورتی که مایل به دریافت فیزیکی طلای خریداری شده خود هستید، درخواست دریافت طلای خود را از بخش خدمات در اپلیکیشن بیرگرم ثبت کنی</p>
                            </div>
                        </div>
                    </div>
                    <h1 className='sm:text-2xl text-lg text-blue-900 font-bold'>نکات مهم در رابطه با تحویل طلای فیزیکی در بیرگرم</h1>
                    <div className='sm:w-1/12 w-1/6 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500'></div>
                    <p>تحویل طلا، یکی از مهمترین بخش‌های طراحی تجربه خرید در بیرگرم محسوب می‌شود. ما هم توجه ویژه‌ای به آن داریم تا مطمئن باشید طلایی که از بیرگرم خریداری می‌کنید، اصالت دارد و با استانداردهای آزمایشگاه ذوب و اختلاط و خلوص طلای ۱۸ عیار ۷۵۰ کاملا مطابق است.</p>
                    <p>۱- طلای تحویلی بیرگرم، در قالب شمش طلای ۵ گرمی با نقش طرح بیرگرم ارائه می‌شود. طلای فیزیکی مورد تقاضای شما باید مضرب صحیحی از ۵ گرم باشد.</p>
                    <p>۲- بسته‌بندی شمش‌های طلای ۵ گرمی بیرگرم، کاملا امن و غیر قابل هک است.</p>
                    <p>۳- به میزان طلایی که قصد دریافت فیزیکی آن را دارد، باید در حساب طلای خود بیرگرم خریداری کرده باشد؛ سپس درخواست دریافت طلای فزیکی خود را ثبت کنید.</p>
                    <p>۴- ضرب و بسته‌بندی شمش‌های طلای ۵ گرمی، هزینه‌هایی داد که هنگام ثبت درخواست طلای فیزیکی، به‌صورت بیرگرم محاسبه و به شما ارائه می‌شود.</p>
                    <p>۵- پس از ثبت درخواست دریافت طلای فیزیکی در بخش «خدمات» اپلیکیشن بیرگرم، از خزانه مالی در اولین فرصت با شما تماس گرفته می‌شود.</p>
                    <p>۶- کل فرآیند دریافت طلای فیزیکی و وضعیت دریافت طلا، از طریق اپلیکیشن بیرگرم قابل ردیابی است.</p>
                    <p>۷- در بیرگرم از منابع قابل اعتماد و آزمایشگاه های معتبر برای تامین، ذوب و بسته‌بندی طلا استفاده می‌کنیم.</p>
                    <p>۸- شمش‌های طلای بیرگرم کاملا معتبر بوده و به‌عنوان مصنوعات طلا در همه مراکز خرید و فروش طلا قابل معامله و خرید و فروش هستند.</p>
                    <p>۹- بیرگرم خریدار شمش‌های طلای تحویلی به کاربرانش است.</p>
                    <p>۱۰- طلای فیزیکی بیرگرم همه مجوزها و گواهی‌های لازم را داشته و با دقت و کیفیت زیادی به شما تحویل داده می‌شود.</p>
                    <p>۱۱- هنگام دریافت طلای خود، فاکتور و رسید معتبر و تضمینی خرید طلایتان را هم دریافت می‌کنید.</p>
                    <p>۱۲- در حال حاضر، تحویل فیزیکی طلا فقط به‌صورت حضوری و در خزانه تحویل فیزیکی بیرگرم انجام می‌شود.</p>
                    <p>۱۳- هنگام تحویل فیزیکی طلا، به‌همراه داشتن کارت ملی الزامی است.</p>
                    <h1 className='sm:text-2xl text-lg text-blue-900 font-bold'>کارمزد دریافت طلا</h1>
                    <div className='sm:w-1/12 w-1/6 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500'></div>
                    <p>پس از خرید طلای آب شده از بیرگرم، دو گزینه برای نگهداری آن دارید:</p>
                    <p className='font-semibold'>۱- نگهداری طلا در خزانه بیرگرم</p>
                    <p className='font-semibold'>۲- دریافت طلا به‌صورت فیزیکی</p>
                    <p>برای دریافت طلای آب شده به‌صورت فیزیکی، باید معادل سه درصد از ارزش طلا را به‌عنوان کارمزد ضرب، پک و تحویل آن پرداخت کنید. </p>
                    <div className='flex flex-col gap-4 bg-gray-200 border rounded-lg px-3 py-5'>
                        <div className='flex gap-2'>
                            <span className='sm:text-lg text-sm text-blue-900 font-bold'>مقدار طلا
                            </span>
                            <span className='mt-3 border-t-2 border-dotted grow border-black'></span>
                            <span className='sm:text-lg text-sm text-yellow-500 font-bold'>کارمزد آن
                            </span>
                        </div>
                        <div className='flex gap-2'>
                            <span className='sm:text-lg text-sm text-blue-900 font-bold'>هر گرم طلای آب‌شده
                            </span>
                            <span className='mt-3 border-t-2 border-dotted grow border-black'></span>
                            <span className='sm:text-lg text-sm text-yellow-500 font-bold'>معادل ۳ درصد از وزن طلا
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='w-12 h-12 border-yellow-400 border rounded-lg flex items-center justify-center bg-yellow-200'>
                            <Image width={14} height={24} src={"/icons/info2.svg"} alt='info' />
                        </div>
                        <h6 className='text-gray-600 font-bold self-center'>مثال محاسبه کارمزد دریافت طلای بیرگرم</h6>
                    </div>
                    <p className='text-gray-600'>درصورتی که قصد تحویل ۵۰۰۰ بیرگرم طلا (یک شمش ۵ گرمی طلا) داشته باشد، معادل ۳ درصد آن، یعنی ۱۵۰ بیرگرم طلا، به‌عنوان هزینه ضرب، پک و تحویل طلا دریافت می‌شود.</p>
                    <h1 className='sm:text-2xl text-lg text-blue-900 font-bold'>یک قدم فراتر برای شفاف‌سازی بیشتر</h1>
                    <div className='sm:w-1/12 w-1/6 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500'></div>
                    <p>در صورتی که هرگونه شک و شبهه‌ای درباره اصالت طلا داشتید، ما در بیرگرم آماده‌ایم تا شما را راهنمایی کرده و مشاوره‌های لازم را ارائه دهیم. کاربران بیرگرم برای ما اولویت اول محسوب شده و رضایت شما از خرید طلا، مهمترین دستاورد و سنجه موفقیت ماست.</p>
                    <div className="flex w-full justify-around">
                        <Button className='bg-blue-900 text-yellow-400 sm:px-3 px-3 sm:py-8 py-3 sm:text-lg text-sm'>خرید طلای آب شده از بیرگرم</Button>
                        <Button variant="bordered" className='border-blue-900 text-blue-900 sm:text-lg text-sm sm:px-3 px-3 sm:py-8 py-3'>مجوز های بیرگرم</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page;
