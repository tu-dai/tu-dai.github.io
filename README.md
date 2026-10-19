# TU-DAI lab website

The website for the Tulane Data and AI Lab, live at https://tu-dai.github.io.

Everything on the site comes from plain text files in this repo. To change the site, edit a file on GitHub (click the pencil icon), commit, and the site updates on its own in a minute or two. No installs, no build step.

## Where things live

| To change...             | Edit this                     |
|--------------------------|-------------------------------|
| A person                 | `_people/<name>.md`           |
| A news item              | `_news/<date>-<topic>.md`     |
| A publication            | `_data/publications.yml`      |
| A talk                   | `_data/talks.yml`             |
| A research project       | `_projects/<project>.md`      |
| Lab name, address, menu  | `_config.yml`                 |
| Home page text           | `index.html` (the first paragraph) |
| Colors and fonts         | top of `assets/css/style.css` |

## Common tasks

### Add a person

1. Upload a square-ish photo to `assets/img/people/` (optional).
2. Create `_people/firstname-lastname.md`:

```markdown
---
name: Jane Doe
role: PhD Student
photo: jane-doe.jpg
email: jdoe@tulane.edu
website: https://janedoe.com
since: 2026
---
A short bio in plain text or Markdown. Leave this empty if you don't want a profile page.
```

- `role` decides the section. It must be one of: `Director`, `Postdoc`, `PhD Student`, `Masters Student`, `Undergraduate`, `Alumni`.
- All fields other than `name` and `role` are optional. Others you can use: `position` (e.g. "Postdoctoral Researcher"), `note` (e.g. "Co-advised with Aron Culotta"), `scholar`, `github`.
- If the person writes a bio, their name links to a profile page that also lists their papers.
- Lab members are bolded in author lists automatically. If someone appears in papers under other spellings, list them all: `pub_names: [Jane Doe, J Doe, J. Doe]`.

### Move someone to alumni

In their file, change `role:` to `Alumni`, delete `since:`, and add:

```yaml
was: PhD, 2027
now: Research Scientist, Google
```

### Add a news item

Create `_news/2026-11-03-short-topic.md`:

```markdown
---
date: 2026-11-03
---
Our paper **Paper Title** is accepted at AAAI 2027!
```

The home page shows the 6 newest items; the News page shows all of them.

### Add a publication

Open `_data/publications.yml` and paste a new entry near the top, under the comment block, so the newest papers stay first:

```yaml
- title: Paper Title
  authors: Jane Doe, Nicholas Mattei
  venue: Proceedings of the 41st AAAI Conference on Artificial Intelligence
  venue_short: AAAI
  year: 2027
  type: conference
  doi: 10.1609/aaai.v41i1.12345
  arxiv: 2507.02152
  code: https://github.com/tu-dai/some-repo
```

- `type` is one of: `conference`, `journal`, `workshop`, `chapter`, `book`, `edited volume`.
- Each link field becomes a button under the paper: `doi` or `url` (Paper), `arxiv` (just the number), `pdf`, `code`, `slides`, `video`, `website`. All optional.
- `award` (e.g. "Best Paper") shows next to the venue.
- `tags` are short topic keywords, written like `tags: [peer selection, mechanism design]`. Each tag links to a filtered list of papers, and any tag used on 3 or more papers shows up under "Browse by topic" on the Publications page and "Topics" on the Research page. The existing tags come from each paper's keywords in [OpenAlex](https://openalex.org); reuse the same wording when you can so papers group together.
- Every paper gets a **BibTeX** button automatically, built from the fields above. To use an exact entry instead (e.g. copied from DBLP), add it like this:

```yaml
  bibtex: |
    @inproceedings{DBLP:conf/aaai/SariolaBCM26,
      ...
    }
```

- Keep the file sorted by year, newest first. A year heading appears whenever the year changes.
- If a title contains a colon, wrap it in single quotes: `title: 'DeepVoting: Learning Voting Rules'`.

### Add a talk

Paste at the top of `_data/talks.yml`:

```yaml
- when: November 2026
  talk: Talk Title - Event Name, City
  link: https://optional-link
```

### Add a research project

Create `_projects/short-name.md`:

```markdown
---
title: Project Name
thrust: decisions
funder: NSF
years: 2026–2029
link: https://optional-link
order: 3
---
One or two paragraphs about the project.
```

`thrust` places it on the Research page: `decisions`, `impact`, or `community` (defined under `thrusts:` in `_config.yml`). `order` sorts projects within a section, lowest first.

## How the site is built

It's a plain [Jekyll](https://jekyllrb.com) site that GitHub Pages builds for free. There is no custom code to maintain:

- `_layouts/` holds the page frame (header, menu, footer), plus layouts for normal pages and people.
- `_includes/` holds small pieces reused across pages: a publication entry, its BibTeX, the topic list, a person card, and the author-linking logic.
- `index.html`, `people.html`, `research.html`, `publications.html`, `talks.html`, `news.html` are the pages.
- `assets/js/publications.js` (type, topic, and search filters on the Publications page) and `assets/js/bibtex.js` (the Copy button) are the only scripts. The site works without them.

**GitHub Pages setting:** Settings → Pages → Build and deployment → Source: "Deploy from a branch", branch `master`, folder `/ (root)`.

### Previewing locally (optional)

Only needed for big changes. With Ruby installed:

```
gem install jekyll -v 3.10.0 && gem install jekyll-sitemap kramdown-parser-gfm webrick
jekyll serve
```

Then open http://localhost:4000.
