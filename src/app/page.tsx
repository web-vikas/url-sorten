"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCopyIcon, MagicWandIcon } from "@radix-ui/react-icons";
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

export default function Home() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const access_token = useStore((state) => state.access_token);
  const { toast } = useToast();
  const [fullURL, setFullURL] = useState(String);
  const [generatedURL, setGeneratedURL] = useState(
    "https://hit-go.vercel.app/SF4m"
  );

  const handelGenerateURL = async () => {
    setGeneratedURL("");
    const res = await generateURL(fullURL, access_token);
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
        description: `ijkl.fun/${res.data.id}`,
      });
    }
  };
  return (
    <>
      <Header />
      <main>
        <div className="flex items-center justify-center min-h-64 flex-col">
          <h1 className="text-7xl font-extrabold">
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
          <p className="max-w-xl  text-center text-lg my-5">
            Create short links, QR Codes, and Custom Links pages. Share them
            anywhere. All inside the IJKL
            Connections Platform.
          </p>
        </div>
        <Card className="max-w-screen-lg m-auto p-5">
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
                  <MagicWandIcon className="mr-3" /> Generate URL
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
            <TabsContent value="custom">COMING SOON</TabsContent>
          </Tabs>
        </Card>
      </main>
      <Footer />
    </>
  );
}
