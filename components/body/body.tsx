import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import { LinkCtr } from '@/components/link-ctr';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

function getAnchor(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/[ ]/g, '-');
}

function Heading({ as, children, ...props }) {
    const As = as;
    const anchor = getAnchor(children);
    const link = `#${anchor}`;

    return (
        <Link href={link} className="anchor" {...props}>
            <span className="anchor-link">#</span>
            <As id={anchor}>{children}</As>
        </Link>
    );
}

function ResponsiveImage(props: any) {
    return (
        <Image
            alt={props.alt}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            {...props}
        />
    );
}

const components = {
    h2: ({ children }: any) => <Heading as={'h2'}>{children}</Heading>,
    h3: ({ children }: any) => <Heading as={'h3'}>{children}</Heading>,
    h4: ({ children }: any) => <Heading as={'h4'}>{children}</Heading>,
    h5: ({ children }: any) => <Heading as={'h5'}>{children}</Heading>,
    h6: ({ children }: any) => <Heading as={'h6'}>{children}</Heading>,
    a: ({ children, ...props }: any) => {
        return <LinkCtr href={props.href || ''}>{children}</LinkCtr>;
    },
    img: ResponsiveImage,
    pre: ({ children }) => {
        return (
            <CopyToClipboard>
                <pre>{children}</pre>
            </CopyToClipboard>
        );
    },
};

export function Body({ children }: { children: string }) {
    const options = {
        // Use one of Shiki's packaged themes
        theme: {
            // dark: 'poimandres',
            // light: 'github-light',
            dark: 'dark-plus',
            light: 'light-plus',
        },
        // Or your own JSON theme
        // theme: JSON.parse(
        //     fs.readFileSync(require.resolve('./themes/dark.json'), 'utf-8')
        // ),

        // Keep the background or use a custom background color?
        keepBackground: false,

        // Callback hooks to add custom logic to nodes when visiting
        // them.
        onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
                node.children = [{ type: 'text', value: ' ' }];
            }
        },
        onVisitHighlightedLine(node) {
            // Each line node by default has `class="line"`.
            node.properties.className.push('highlighted');
        },
        onVisitHighlightedWord(node, id) {
            // Each word node has no className by default.
            node.properties.className = ['word'];

            if (id) {
                // If the word spans across syntax boundaries (e.g. punctuation), remove
                // colors from the child nodes.
                if (node.properties['data-rehype-pretty-code-wrapper']) {
                    node.children.forEach((childNode) => {
                        childNode.properties.style = '';
                    });
                }

                node.properties.style = '';
                node.properties['data-word-id'] = id;
            }
        },
    };

    return (
        <MDXRemote
            source={children}
            options={{
                mdxOptions: {
                    //   remarkPlugins: [
                    //     // Adds support for GitHub Flavored Markdown
                    //     remarkGfm,
                    //     // Makes emojis more accessible
                    //     remarkA11yEmoji,
                    //     // generates a table of contents based on headings
                    //     remarkToc,
                    //   ],
                    // These work together to add IDs and linkify headings
                    rehypePlugins: [[rehypePrettyCode, options]],
                },
            }}
            components={components}
        />
    );
}
