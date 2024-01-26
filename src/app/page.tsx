"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ClipboardCopyIcon,
  ExternalLinkIcon,
  LockClosedIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import QRCode from "qrcode.react";
import useStore from "./store";
import { useState } from "react";
import { generateURL } from "./action";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function Home() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const access_token = useStore((state) => state.access_token);
  const { toast } = useToast();
  const [fullURL, setFullURL] = useState(String);
  const [generatedURL, setGeneratedURL] = useState(String);
  const [customEndPoint, setCustomEndPoint] = useState(String);
  const [isLoading, setIsLoading] = useState(false);

  const handelGenerateURL = async () => {
    setIsLoading(true);
    setGeneratedURL("");
    const res = await generateURL(fullURL, customEndPoint, access_token);
    if (res.data.error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: res.data.error,
        variant: "destructive",
      });
    } else {
      setGeneratedURL(`https://hit-go.vercel.app/${res.data.id}`);
      toast({
        title: "Link Generated !",
        description: `ijkl.vercel.app/${res.data.id}`,
      });
    }
    setIsLoading(false);
  };
  return (
    <>
      <Header />
      <main>
        <div className="flex items-center justify-center min-h-64 flex-col mx-2">
          <h1 className="text-4xl md:text-7xl  font-extrabold">
            Transforming
            <span className="text-red-900 hover:border-b-8 cursor-pointer border-red-900 transition-all leading-tight">
              {"  Links  "}
            </span>
            into <br />
            Meaningful
            <span className="text-red-900 hover:border-b-8 cursor-pointer border-red-900 transition-all leading-tight">
              {"  Connections  "}
            </span>
            .
          </h1>
          <p className="max-w-xl  text-center text-md md:text-lg my-5">
            Create short links, QR Codes, and Custom Links pages. Share them
            anywhere. All inside the IJKL Connections Platform.
          </p>
        </div>
        <Card className="max-w-screen-lg mx-2 md:m-auto p-5">
          <Tabs defaultValue="sort">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sort">Short Link</TabsTrigger>
              <TabsTrigger value="custom">Custom Link</TabsTrigger>
            </TabsList>
            <TabsContent value="sort">
              <h1 className="text-xl font-semibold py-3">
                Shorten a <span className="text-red-900">long link.</span>
              </h1>
              <div>
                <Label htmlFor="URL">
                  Paste a long URL
                  <span className="text-red-700 font-extrabold">*</span>
                </Label>
                <Input
                  id="URL"
                  type="url"
                  required
                  value={fullURL}
                  onChange={(e) => setFullURL(e.target.value)}
                  placeholder="https://postman.co/workspace/My-Workspace/request/25668016"
                  className="max-w-lg my-2"
                />
              </div>
              <div className="">
                <Button
                  disabled={!isLoggedIn}
                  className="mt-3"
                  onClick={handelGenerateURL}
                >
                  {isLoggedIn && <MagicWandIcon className="mr-3" />}
                  {isLoggedIn ? "Generate URL" : "Login To Generate URL"}
                </Button>
              </div>
              {generatedURL !== "" && (
                <div className="flex md:flex-row flex-col justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold py-3">
                      Generated <span className="text-red-900">URL.</span>
                    </h2>
                    <div className="max-w-lg my-2">
                      <Input type="text" disabled value={generatedURL} />
                      <div className="flex items-center gap-2 my-3">
                        <Popover>
                          <PopoverTrigger>
                            <Button
                              asChild
                              size="icon"
                              onClick={() => {
                                navigator.clipboard.writeText(generatedURL);
                              }}
                            >
                              <ClipboardCopyIcon className="text-white p-2" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="max-w-32 text-center">
                            Copied !
                          </PopoverContent>
                        </Popover>

                        <Link href={generatedURL} target="_blank">
                          <Button size={"icon"}>
                            <ExternalLinkIcon />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-xl font-semibold py-3">
                      Generated <span className="text-red-900">QR.</span>
                    </h2>
                    <div>
                      <QRCode value={generatedURL} size={200} />
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="custom">
              <h1 className="text-xl font-semibold py-3">
                Shorten a <span className="text-red-900">long link.</span>
              </h1>
              <div>
                <Label htmlFor="URL">
                  Paste a long URL
                  <span className="text-red-700 font-extrabold">*</span>
                </Label>
                <Input
                  type="url"
                  required
                  value={fullURL}
                  onChange={(e) => setFullURL(e.target.value)}
                  placeholder="https://postman.co/workspace/My-Workspace/request/25668016"
                  className="max-w-lg my-2"
                />
              </div>
              <div>
                <Label htmlFor="URL">
                  Custom URL Endpoint
                  <span className="text-red-700 font-extrabold">*</span>
                </Label>
                <div className="flex gap-3 items-center">
                  <Input
                    type="text"
                    disabled
                    required
                    value={"hit-go.vercel.app"}
                    placeholder="wedding"
                    className="max-w-xs my-2"
                  />
                  <span className="font-extrabold">/</span>
                  <Input
                    type="url"
                    required
                    value={customEndPoint}
                    onChange={(e) => setCustomEndPoint(e.target.value)}
                    placeholder="wedding"
                    maxLength={6}
                    minLength={4}
                    className="max-w-32 my-2"
                  />
                </div>
              </div>
              <div className="">
                <Button
                  disabled={!isLoggedIn || isLoading}
                  className="mt-3"
                  onClick={handelGenerateURL}
                >
                  {isLoggedIn && <MagicWandIcon className="mr-3" />}
                  {isLoggedIn ? "Generate URL" : "Login To Generate URL"}
                </Button>
              </div>
              {generatedURL !== "" && (
                <div className="flex md:flex-row flex-col justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold py-3">
                      Generated <span className="text-red-900">URL.</span>
                    </h2>
                    <div className="max-w-lg my-2 flex gap-2 items-center">
                      <Input type="text" disabled value={generatedURL} />
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            asChild
                            size="icon"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedURL);
                            }}
                          >
                            <ClipboardCopyIcon className="text-white p-2" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-32 text-center">
                          Copied !
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-xl font-semibold py-3">
                      Generated <span className="text-red-900">QR.</span>
                    </h2>
                    <div>
                      <QRCode value={generatedURL} size={200} />
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
        <div className="md:flex justify-center items-center my-8 gap-16 sm:text-center">
          <div className="image">
            <Image src="/globe.png" height={250} width={450} alt="glob image" />
          </div>
          <div className="m-3">
            <div className=" pl-8  pr-8 mt-10 text-center">
              <div className="flex justify-start items-center gap-5">
                <h1 className="text-3xl font-bold">500K</h1>
                <div>
                  <p className="text-sm">Globel Paying Customer</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-start items-center gap-5 mt-3">
                <h1 className="text-3xl font-bold">256M</h1>
                <div>
                  <p className="text-sm">Link or QRCode Created Monthly</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-start items-center gap-5 mt-3">
                <h1 className="text-3xl font-bold">50B</h1>
                <div>
                  <p className="text-sm">
                    Connections (Click or Scans) Monthly
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-start items-center gap-5 mt-3">
                <h1 className="text-3xl font-bold">800+</h1>
                <div>
                  <p className="text-sm">Apps intigration</p>
                </div>
              </div>
              <Separator />
            </div>
          </div>
        </div>
        <div className="md:w-[70%] mx-auto my-16">
          <h1 className="text-center text-4xl font-bold ">
            Trimming links, boosting brevity: IJKL
          </h1>
          <div className="text-center mt-6  md:pr-4 pl-4">
            <p>
              Unleash the power of concise communication with our link
              shortening website. Say goodbye to lengthy URLs and hello to
              streamlined sharing.{" "}
              <span className="text-red-900  cursor-pointer">Effortlessly</span>{" "}
              transform your links into sleek, compact addresses, perfect for
              social media, messaging, and beyond. Simplify, share, and make
              every link count with ease.
            </p>
            <div className="flex justify-center items-center mt-5 gap-5">
              <div>
                <Image
                  src="/author.gif"
                  height={200}
                  width={50}
                  alt="author logo"
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="font-bold">Chandan Kumar Maurya</p>
                <p className="text-sm text-left">Designer</p>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="py-7">
          <div className="md:max-w-3xl mx-auto pl-8 pr-8">
            <h1 className="font-bold text-3xl text-center my-5">
              Frequently asked questions
            </h1>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is a URL shortener?</AccordionTrigger>
                <AccordionContent>
                  A URL shortener, also known as a link shortener, seems like a
                  simple tool, but it is a service that can have a dramatic
                  impact on your marketing efforts.
                  <br />
                  Link shorteners work by transforming any long URL into a
                  shorter, more readable link. When a user clicks the shortened
                  version, they’re automatically forwarded to the destination
                  URL.
                  <br />
                  Think of a short URL as a more descriptive and memorable
                  nickname for your long webpage address. You can, for example,
                  use a short URL like bit.ly/CelebrateBitly so people will have
                  a good idea about where your link will lead before they click
                  it.
                  <br />
                  If you’re contributing content to the online world, you need a
                  URL shortener.
                  <br />
                  Make your URLs stand out with our easy to use free link
                  shortener above.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger> Benefits of a short URL</AccordionTrigger>
                <AccordionContent>
                  How many people can even remember a long web address,
                  especially if it has tons of characters and symbols? A short
                  URL can make your link more memorable. Not only does it allow
                  people to easily recall and share your link with others, it
                  can also dramatically improve traffic to your content.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger> What is a Custom URL?</AccordionTrigger>
                <AccordionContent>
                  Custom URL allow you to generate the usr end of your choice.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
